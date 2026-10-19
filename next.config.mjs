// Static preview by default. The same UI can run with a Next.js API on Node/Vercel.
if(process.env.BRANDBOX_SERVER!=='1'&&process.env.NEXT_PUBLIC_ORDERS_ENABLED==='true')throw new Error('Live orders require BRANDBOX_SERVER=1. Static exports must stay in demo mode.');
if(process.env.NEXT_PUBLIC_ORDERS_ENABLED==='true'){
  const required=['SITE_ORIGIN','ORDER_WEBHOOK_URL','ORDER_WEBHOOK_TOKEN','TURNSTILE_SECRET_KEY','RATE_LIMIT_REDIS_URL','RATE_LIMIT_REDIS_TOKEN','RATE_LIMIT_HASH_SECRET','ORDERS_CONSENT_VERSION','NEXT_PUBLIC_CONSENT_VERSION','NEXT_PUBLIC_TURNSTILE_SITE_KEY','NEXT_PUBLIC_SITE_ORIGIN'];
  if(process.env.ORDERS_ENABLED!=='true'||process.env.ORDERS_LEGAL_READY!=='true'||required.some(key=>!process.env[key])||process.env.ORDERS_CONSENT_VERSION!==process.env.NEXT_PUBLIC_CONSENT_VERSION||process.env.SITE_ORIGIN!==process.env.NEXT_PUBLIC_SITE_ORIGIN)throw new Error('Live orders require complete server configuration and approved matching consent/origin settings.');
  for(const key of ['SITE_ORIGIN','ORDER_WEBHOOK_URL','RATE_LIMIT_REDIS_URL']){const url=new URL(process.env[key]);if(url.protocol!=='https:'||url.username||url.password)throw new Error('Live services require HTTPS URLs without embedded credentials.');}
}
export default {output:process.env.BRANDBOX_SERVER==='1'?undefined:'export',trailingSlash:true,images:{unoptimized:true}};
