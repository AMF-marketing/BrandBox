const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),zlib=require('node:zlib');
const root=path.resolve(process.argv[2]||'out');
const port=Number(process.env.PORT||3000);
if(!fs.existsSync(path.join(root,'index.html')))throw Error('Сборка отсутствует. Сначала выполните npm run build.');
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.ttf':'font/ttf','.woff2':'font/woff2','.txt':'text/plain','.xml':'application/xml','.json':'application/json'};
const server=http.createServer((req,res)=>{
  try{
    if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{'Allow':'GET, HEAD'});return res.end()}
    let file=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]));
    if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);return res.end()}
    if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
    const found=fs.existsSync(file)&&fs.statSync(file).isFile();
    if(!found)file=path.join(root,'404.html');
    const headers={'Content-Type':mime[path.extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff','Cache-Control':file.includes(path.sep+'_next'+path.sep)?'public, max-age=31536000, immutable':'no-cache'};
    const gzip=/\bgzip\b/.test(req.headers['accept-encoding']||'');
    if(gzip){headers['Content-Encoding']='gzip';headers['Vary']='Accept-Encoding'}
    res.writeHead(found?200:404,headers);
    if(req.method==='HEAD')return res.end();
    const stream=fs.createReadStream(file);stream.on('error',()=>res.destroy());
    if(gzip)stream.pipe(zlib.createGzip()).pipe(res);else stream.pipe(res);
  }catch{res.writeHead(400);res.end('Bad request')}
});
server.on('error',error=>{console.error(error.code==='EADDRINUSE'?'Порт занят. Закройте предыдущий сервер или задайте PORT.':error.message);process.exitCode=1});
server.listen(port,'127.0.0.1',()=>console.log(`http://127.0.0.1:${port}`));
