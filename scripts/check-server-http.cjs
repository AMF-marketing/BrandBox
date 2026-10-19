const {spawn}=require('node:child_process'),http=require('node:http'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),port=3021;
const child=spawn(process.execPath,[path.join(root,'node_modules/next/dist/bin/next'),'start','--hostname','127.0.0.1','--port',String(port)],{cwd:root,env:{...process.env,BRANDBOX_SERVER:'1',ORDERS_ENABLED:'false'},stdio:['ignore','pipe','pipe']});
let started=false,checks=0;const timer=setTimeout(()=>{child.kill();console.error('Server check startup timeout');process.exitCode=1},30000);
child.stderr.on('data',d=>console.error(d.toString()));
function request(route,method='GET',body='',type='application/json'){return new Promise((resolve,reject)=>{const req=http.request({hostname:'127.0.0.1',port,path:route,method,headers:{'Content-Type':type,'Content-Length':Buffer.byteLength(body)}},res=>{let data='';res.on('data',d=>data+=d);res.on('end',()=>resolve({status:res.statusCode,body:data,headers:res.headers}))});req.setTimeout(5000,()=>{req.destroy();reject(Error('HTTP timeout'))});req.on('error',reject);req.end(body)})}
child.stdout.on('data',async d=>{if(started||!d.toString().includes('Ready'))return;started=true;try{
 for(const route of ['/','/catalog/','/catalog/pechati-ip/','/catalog/shtampy/','/contacts/']){assert.equal((await request(route)).status,200);checks++}
 assert.equal((await request('/api/orders/')).status,405);checks++;
 assert.equal((await request('/api/orders/','POST','{}','text/plain')).status,415);checks++;
 const disabled=await request('/api/orders/','POST','{}');assert.equal(disabled.status,503);assert.equal(disabled.headers['cache-control'],'no-store');assert.ok(!JSON.parse(disabled.body).id);checks+=3;
 assert.equal((await request('/api/orders/','POST','{')).status,400);checks++;
 assert.equal((await request('/api/orders/','POST',JSON.stringify({x:'x'.repeat(17000)}))).status,413);checks++;
 console.log(JSON.stringify({server_http_checks:checks,status:'passed',live_delivery:'disabled'}));
}catch(error){console.error(error.message);process.exitCode=1}finally{clearTimeout(timer);child.kill()}});
child.on('exit',code=>{if(!started){clearTimeout(timer);console.error('Server did not start: '+code);process.exitCode=1}});
