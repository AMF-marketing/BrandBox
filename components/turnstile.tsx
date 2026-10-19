'use client';
import Script from 'next/script';
import {useEffect,useRef,useState} from 'react';
type TurnstileAPI={render:(node:HTMLElement,options:Record<string,unknown>)=>string;remove:(id:string)=>void};
declare global {interface Window {turnstile?:TurnstileAPI}}
export function SpamChallenge({onToken,attempt}:{onToken:(token:string)=>void;attempt:number}){
  const element=useRef<HTMLDivElement>(null);const callback=useRef(onToken);callback.current=onToken;
  const [ready,setReady]=useState(false),[failed,setFailed]=useState(false);
  useEffect(()=>{if(!ready||!element.current||!window.turnstile)return;const api=window.turnstile;const id=api.render(element.current,{sitekey:process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,size:'compact',language:'ru',action:'brandbox-order',callback:(token:string)=>{setFailed(false);callback.current(token)},'expired-callback':()=>callback.current(''),'error-callback':()=>{callback.current('');setFailed(true)}});return ()=>api.remove(id)},[ready,attempt]);
  return <><Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={()=>setReady(true)} onError={()=>setFailed(true)}/><div ref={element}/>{failed&&<p role="alert" className="error">Не удалось загрузить проверку защиты. Отправка недоступна, попробуйте позже.</p>}</>;
}
