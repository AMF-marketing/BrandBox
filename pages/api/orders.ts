import type {NextApiRequest,NextApiResponse} from 'next';
import {handleOrder} from '../../server/orders';
export const config={api:{bodyParser:{sizeLimit:'16kb'}}};
export default async function orders(req:NextApiRequest,res:NextApiResponse){
  res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');
  if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({error:'Разрешён только POST.'})}
  if(!req.headers['content-type']?.startsWith('application/json'))return res.status(415).json({error:'Ожидается JSON.'});
  // Trust the hosting proxy only when its ingress is controlled by the operator.
  const forwarded=process.env.TRUST_PROXY==='true'?req.headers['x-forwarded-for']:undefined;
  const ip=typeof forwarded==='string'?forwarded.split(',')[0].trim():req.socket.remoteAddress||'unknown';
  const result=await handleOrder(req.body,req.headers.origin,ip,process.env);
  if(result.retryAfter)res.setHeader('Retry-After',result.retryAfter);
  return res.status(result.status).json(result.body);
}
