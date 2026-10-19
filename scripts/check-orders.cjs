const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),ts=require('typescript'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),tmp=fs.mkdtempSync(path.join(os.tmpdir(),'brandbox-orders-'));
for(const name of ['server/orders','lib/catalog','lib/order-validation']){const dest=path.join(tmp,name+'.js');fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,ts.transpileModule(fs.readFileSync(path.join(root,name+'.ts'),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText)}
const {handleOrder}=require(path.join(tmp,'server/orders.js'));
const env={ORDERS_ENABLED:'true',ORDERS_LEGAL_READY:'true',ORDERS_CONSENT_VERSION:'test-v1',SITE_ORIGIN:'https://brandbox.example',ORDER_WEBHOOK_URL:'https://receiver.example/orders',ORDER_WEBHOOK_TOKEN:'test-only',RATE_LIMIT_REDIS_URL:'https://redis.example',RATE_LIMIT_REDIS_TOKEN:'test-only',TURNSTILE_SECRET_KEY:'test-only',RATE_LIMIT_HASH_SECRET:'test-only'};
const valid={name:'Тест',phone:'+7 (913) 123-45-67',product:'COLOP',contactMethod:'Телефон',comment:'Тестовое обращение',dataConsent:true,marketingConsent:false,consentVersion:'test-v1',turnstileToken:'test-token',website:'',requestId:'12345678-1234-4234-8234-123456789abc'};
let count=0,calls=[];
async function check(patch={},expected=201,options={}){
 calls=[];const mocked=async(url,init)=>{calls.push({url,init});if(url===env.RATE_LIMIT_REDIS_URL){if(options.redisError)throw Error('test');return Response.json({result:[options.rate||1,600]})}if(url.includes('siteverify'))return Response.json({success:options.challenge!==false,hostname:options.hostname||'brandbox.example',action:options.action||'brandbox-order'});if(options.webhookError)return new Response('',{status:500});return Response.json(options.reply||{accepted:true,id:'persisted-test-id'})};
 const result=await handleOrder({...valid,...patch},options.origin||env.SITE_ORIGIN,'192.0.2.1',{...env,...options.env},mocked);assert.equal(result.status,expected);count++;return result;
}
(async()=>{try{
 await check({},503,{env:{ORDERS_ENABLED:'false'}});assert.equal(calls.length,0);
 await check({},503,{env:{ORDERS_LEGAL_READY:'false'}});await check({},503,{env:{ORDER_WEBHOOK_TOKEN:''}});
 await check({},403,{origin:'https://other.example'});assert.equal(calls.length,0);
 for(const patch of [{name:' '},{phone:'+7 (000) 000-00-00'},{phone:'abc79131234567'},{dataConsent:false},{marketingConsent:'yes'},{consentVersion:'old'},{product:'Unknown'},{contactMethod:'Unknown'},{comment:'x'.repeat(3001)},{requestId:'invalid'},{turnstileToken:''}])await check(patch,422);
 await check({website:'spam'},400);await check({name:123},400);
 await check({},429,{rate:6});assert.equal(calls.length,1);
 await check({},503,{redisError:true});await check({},422,{challenge:false});await check({},422,{hostname:'wrong.example'});await check({},422,{action:'wrong-action'});
 await check({},503,{webhookError:true});await check({},503,{reply:{id:'id-without-acceptance'}});await check({},503,{reply:{accepted:true,id:''}});
 await check();const delivery=calls.at(-1);const payload=JSON.parse(delivery.init.body);assert.equal(payload.phone,'+79131234567');assert.equal(payload.marketingConsent,false);assert.equal(delivery.init.headers['Idempotency-Key'],valid.requestId);assert.ok(delivery.init.headers['X-BrandBox-Signature'].startsWith('sha256='));assert.ok(!delivery.init.body.includes('192.0.2.1'));assert.equal(payload.catalogItem.slug,'colop');assert.equal(payload.catalogItem.unitPrice,2500);assert.equal(payload.catalogItem.priceFrom,false);count+=8;await check({unitPrice:1,price:1});assert.equal(JSON.parse(calls.at(-1).init.body).catalogItem.unitPrice,2500);count++;
 console.log(JSON.stringify({server_order_checks:count,status:'passed',external_delivery:'mocked only; no real recipients contacted'}));
}finally{assert.ok(path.resolve(tmp).startsWith(path.resolve(os.tmpdir())+path.sep+'brandbox-orders-'));fs.rmSync(tmp,{recursive:true,force:true})}})().catch(error=>{console.error(error);process.exitCode=1});
