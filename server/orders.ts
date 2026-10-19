import {createHmac} from 'node:crypto';
import {validateContact} from '../lib/order-validation';
import {products} from '../lib/catalog';

export type OrderResult={status:number;body:{id?:string;error?:string};retryAfter?:number};
type Env=Record<string,string|undefined>;
const fail=(status:number,error:string):OrderResult=>({status,body:{error}});
const choices=new Set<string>(['Не определился',...products.map(p=>p.name),'Индивидуальный макет']);
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function secureUrl(value:string|undefined):boolean{try{const u=new URL(value||'');return u.protocol==='https:'&&!u.username&&!u.password&&!['localhost','127.0.0.1','[::1]'].includes(u.hostname)}catch{return false}}
export function configured(env:Env):boolean{return env.ORDERS_ENABLED==='true'&&env.ORDERS_LEGAL_READY==='true'&&!!env.ORDERS_CONSENT_VERSION&&secureUrl(env.SITE_ORIGIN)&&secureUrl(env.ORDER_WEBHOOK_URL)&&secureUrl(env.RATE_LIMIT_REDIS_URL)&&!!env.ORDER_WEBHOOK_TOKEN&&!!env.RATE_LIMIT_REDIS_TOKEN&&!!env.TURNSTILE_SECRET_KEY&&!!env.RATE_LIMIT_HASH_SECRET}

/** No body/IP logging. No raw order storage in a function's ephemeral filesystem.
 * Receiver must persist orders, deduplicate Idempotency-Key and return accepted+id. */
export async function handleOrder(input:unknown,origin:string|undefined,ip:string,env:Env,fetcher:typeof fetch=fetch):Promise<OrderResult>{
  if(!configured(env))return fail(503,'Приём заявок ещё не подключён. Данные не отправлены.');
  if(origin!==new URL(env.SITE_ORIGIN!).origin)return fail(403,'Отправка с этого адреса запрещена.');
  if(!input||typeof input!=='object'||Array.isArray(input))return fail(400,'Неверный формат заявки.');
  const data=input as Record<string,unknown>;
  if(typeof data.website!=='string'||data.website!=='')return fail(400,'Не удалось проверить заявку.');
  const fields=['name','phone','product','contactMethod','comment','consentVersion','turnstileToken','requestId'] as const;
  if(fields.some(k=>typeof data[k]!=='string'))return fail(400,'Заполните обязательные поля.');
  const name=(data.name as string).trim(),phone=(data.phone as string).replace(/\D/g,''),comment=(data.comment as string).trim();
  const issue=validateContact(name,phone,data.dataConsent===true);
  if(issue)return fail(422,issue);
  if(name.length>100||(data.phone as string).length>40||!/^[+\d ()-]+$/.test(data.phone as string)||comment.length>3000||/\p{Cc}/u.test(name)||!choices.has(data.product as string)||!['Телефон','Сообщение на телефон'].includes(data.contactMethod as string)||typeof data.marketingConsent!=='boolean'||data.consentVersion!==env.ORDERS_CONSENT_VERSION||!uuid.test(data.requestId as string)||(data.turnstileToken as string).length>2048||!(data.turnstileToken as string).length)return fail(422,'Проверьте данные заявки и согласие.');
  try{
    // Atomic shared limiter, works across serverless instances. Stores only HMAC(IP).
    const key='brandbox:orders:'+createHmac('sha256',env.RATE_LIMIT_HASH_SECRET!).update(ip||'unknown').digest('hex');
    const lua="local n=redis.call('INCR',KEYS[1]);if n==1 then redis.call('EXPIRE',KEYS[1],600) end;return {n,redis.call('TTL',KEYS[1])}";
    const rate=await fetcher(env.RATE_LIMIT_REDIS_URL!,{method:'POST',headers:{Authorization:'Bearer '+env.RATE_LIMIT_REDIS_TOKEN,'Content-Type':'application/json'},body:JSON.stringify(['EVAL',lua,'1',key]),signal:AbortSignal.timeout(5000),redirect:'error'});
    if(!rate.ok)throw Error('limiter unavailable');
    const limit=await rate.json() as {result?:unknown};
    if(!Array.isArray(limit.result)||limit.result.length!==2||!limit.result.every(n=>typeof n==='number'))throw Error('limiter invalid');
    if(limit.result[0]>5)return {status:429,body:{error:'Слишком много попыток. Попробуйте позже.'},retryAfter:Math.max(1,limit.result[1])};
    const verification=await fetcher('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({secret:env.TURNSTILE_SECRET_KEY,response:data.turnstileToken}),signal:AbortSignal.timeout(5000),redirect:'error'});
    if(!verification.ok)throw Error('challenge unavailable');
    const challenge=await verification.json() as {success?:boolean;hostname?:string;action?:string};
    if(challenge.success!==true||challenge.hostname!==new URL(env.SITE_ORIGIN!).hostname||challenge.action!=='brandbox-order')return fail(422,'Проверка защиты не пройдена. Повторите её.');
    const catalogItem=products.find(p=>p.name===data.product);
    const payload={catalogItem:catalogItem?{slug:catalogItem.slug,unitPrice:catalogItem.price,priceFrom:catalogItem.priceFrom,currency:'RUB'}:null,requestId:data.requestId,name,phone:'+'+phone,product:data.product,contactMethod:data.contactMethod,comment,dataConsent:true,marketingConsent:data.marketingConsent,consentVersion:data.consentVersion,receivedAt:new Date().toISOString()};
    const body=JSON.stringify(payload);
    const delivery=await fetcher(env.ORDER_WEBHOOK_URL!,{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+env.ORDER_WEBHOOK_TOKEN,'Idempotency-Key':data.requestId as string,'X-BrandBox-Signature':'sha256='+createHmac('sha256',env.ORDER_WEBHOOK_TOKEN!).update(body).digest('hex')},body,signal:AbortSignal.timeout(10000),redirect:'error'});
    if(!delivery.ok)throw Error('receiver rejected');
    const accepted=await delivery.json() as {accepted?:boolean;id?:unknown};
    if(accepted.accepted!==true||typeof accepted.id!=='string'||!accepted.id.trim()||accepted.id.length>128)throw Error('receiver did not confirm');
    return {status:201,body:{id:accepted.id}};
  }catch{return fail(503,'Не удалось подтвердить приём заявки. Повторите попытку позже.');}
}
