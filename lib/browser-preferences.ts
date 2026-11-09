export const privacyKey='brandbox_privacy_v1';
export const exitKey='brandbox_exit_v1';
export const privacyEvent='brandbox-privacy-change';
export const weekMs=7*24*60*60*1000;
export const exitDelayMs=30_000;
export type PrivacyChoice={version:1;maps:boolean;expiresAt:number};
export type ExitChoice={dismissedUntil?:number;converted?:boolean};
const memory=new Map<string,string>();
export function readStored(key:string):string|null{try{return localStorage.getItem(key)||memory.get(key)||null}catch{return memory.get(key)||null}}
export function writeStored(key:string,value:string){memory.set(key,value);try{localStorage.setItem(key,value)}catch{/* Preferences remain valid for this page session. */}}
export function getPrivacy():PrivacyChoice|null{
  try{
    const cookie=typeof document!=='undefined'?document.cookie.split('; ').find(s=>s.startsWith(privacyKey+'='))?.split('=').slice(1).join('='):null;
    const raw=cookie?decodeURIComponent(cookie):readStored(privacyKey);
    const data=raw?JSON.parse(raw):null;
    return data?.version===1&&typeof data.maps==='boolean'&&typeof data.expiresAt==='number'&&data.expiresAt>Date.now()?data:null;
  }catch{return null}
}
export function savePrivacy(maps:boolean){
  const raw=JSON.stringify({version:1,maps,expiresAt:Date.now()+365*24*60*60*1000});writeStored(privacyKey,raw);
  try{document.cookie=privacyKey+'='+encodeURIComponent(raw)+'; Path=/; Max-Age=31536000; SameSite=Lax'+(location.protocol==='https:'?'; Secure':'')}catch{/* Cookie storage may be disabled. */}
  window.dispatchEvent(new Event(privacyEvent));
}
export function getExit():ExitChoice{try{const value=JSON.parse(readStored(exitKey)||'{}');return value&&typeof value==='object'&&!Array.isArray(value)?value:{}}catch{return {}}}
export function exitEligible(choice:ExitChoice,now:number,startedAt:number,desktop:boolean){return desktop&&now-startedAt>=exitDelayMs&&choice.converted!==true&&!(typeof choice.dismissedUntil==='number'&&Number.isFinite(choice.dismissedUntil)&&choice.dismissedUntil>now)}
export function dismissExit(now=Date.now()){writeStored(exitKey,JSON.stringify({...getExit(),dismissedUntil:now+weekMs}))}
export function convertExit(){writeStored(exitKey,JSON.stringify({converted:true}))}
