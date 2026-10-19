const {spawn}=require('node:child_process'),path=require('node:path');
const command=process.argv[2];if(!['build','start','dev'].includes(command))throw Error('Expected build, start or dev.');
const root=path.resolve(__dirname,'..');
const child=spawn(process.execPath,[path.join(root,'node_modules/next/dist/bin/next'),command,...(command==='dev'?['--hostname','127.0.0.1']:[])],{cwd:root,env:{...process.env,BRANDBOX_SERVER:'1'},stdio:'inherit'});
child.on('error',error=>{console.error(error.message);process.exitCode=1});child.on('exit',code=>{process.exitCode=code??1});
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>child.kill(signal));
