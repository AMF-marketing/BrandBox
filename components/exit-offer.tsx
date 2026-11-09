'use client';
import Link from 'next/link';
import {useEffect,useRef,useState} from 'react';
import {liveOrders,sendOrder} from '@/lib/order-api';
import {formatPhone,validateContact} from '@/lib/order-validation';
import {contactMethods,discountTerms} from '@/lib/campaigns';
import {getExit,exitEligible,dismissExit,convertExit} from '@/lib/browser-preferences';
import {SpamChallenge} from './turnstile';

export function ExitOffer({orderOpen}:{orderOpen:boolean}){
  const [open,setOpen]=useState(false);
  const [startedAt]=useState(()=>Date.now());
  const shown=useRef(false),lastY=useRef(0);
  useEffect(()=>{
    const move=(event:MouseEvent)=>{if(event.clientY>8)lastY.current=event.clientY};
    const leave=(event:MouseEvent)=>{
      if(event.relatedTarget!==null||event.clientY>8||lastY.current<=event.clientY||shown.current||orderOpen||document.hidden||document.querySelector('dialog[open]'))return;
      if(!exitEligible(getExit(),Date.now(),startedAt,matchMedia('(hover: hover) and (pointer: fine) and (min-width: 961px)').matches))return;
      shown.current=true;setOpen(true);
    };
    document.addEventListener('mousemove',move,{passive:true});document.addEventListener('mouseout',leave);
    return()=>{document.removeEventListener('mousemove',move);document.removeEventListener('mouseout',leave)};
  },[startedAt,orderOpen]);
  return open?<ExitDialog close={()=>{dismissExit();setOpen(false)}}/>:null;
}
function ExitDialog({close}:{close:()=>void}){
  const dialog=useRef<HTMLDialogElement>(null),requestId=useRef(''),fingerprint=useRef('');
  const [name,setName]=useState(''),[phone,setPhone]=useState(''),[method,setMethod]=useState('Телефон'),[consent,setConsent]=useState(false),[ads,setAds]=useState(false),[error,setError]=useState(''),[pending,setPending]=useState(false),[success,setSuccess]=useState(''),[token,setToken]=useState(''),[attempt,setAttempt]=useState(0),[website,setWebsite]=useState(''),[demo,setDemo]=useState(false);
  useEffect(()=>{const previous=document.activeElement as HTMLElement|null;const oldOverflow=document.body.style.overflow;dialog.current?.showModal();document.body.style.overflow='hidden';return()=>{document.body.style.overflow=oldOverflow;previous?.focus()}},[]);
  async function submit(event:React.FormEvent){
    event.preventDefault();if(pending||success)return;setError('');setDemo(false);
    const issue=validateContact(name,phone,consent);if(issue){setError(issue);return}
    if(!liveOrders){setDemo(true);return}
    if(!token){setError('Пройдите проверку защиты.');return}
    setPending(true);
    try{
      const current=JSON.stringify({name,phone,method,consent,ads});
      if(!requestId.current||fingerprint.current!==current){requestId.current=crypto.randomUUID();fingerprint.current=current}
      const result=await sendOrder('/api/orders/',{name,phone,product:'Не определился',contactMethod:method,comment:'Скидка 400 ₽ / Exit Popup',source:'exit-popup',offerId:'exit400',dataConsent:true,marketingConsent:ads,consentVersion:process.env.NEXT_PUBLIC_CONSENT_VERSION||'',turnstileToken:token,website,requestId:requestId.current},AbortSignal.timeout(20000));
      convertExit();setSuccess(result.id);
    }catch(issue){setError(issue instanceof Error&&/[а-яё]/i.test(issue.message)?issue.message:'Не удалось подтвердить отправку. Проверьте соединение и повторите попытку.')}
    finally{setPending(false);setToken('');setAttempt(v=>v+1)}
  }
  return <dialog ref={dialog} className="exit-dialog" aria-labelledby="exit-heading" aria-describedby="exit-description" aria-busy={pending} onCancel={e=>{e.preventDefault();if(!pending)close()}} onClick={e=>{if(e.target===e.currentTarget&&!pending)close()}}>
    <button type="button" className="close" disabled={pending} onClick={close} aria-label="Закрыть предложение">×</button>
    <h2 id="exit-heading">Для вас скидка!</h2>
    <div className="exit-amount">400 <span>₽</span></div>
    <p id="exit-description">Оставьте контакты, чтобы заказать печать со скидкой.</p>
    {!liveOrders&&<p className="demo-notice">Демонстрационная форма. Заявки пока не отправляются.</p>}
    {success?<div className="success-note" role="status"><p>Получатель подтвердил заявку. Номер: {success}.</p><button className="button" onClick={close}>Закрыть</button></div>:<form onSubmit={submit} noValidate>
      <div className="fields"><label>Имя<input autoComplete="given-name" maxLength={100} value={name} onChange={e=>setName(e.target.value)} disabled={pending}/></label><label>Телефон<input type="tel" inputMode="tel" autoComplete="tel" placeholder="+7 (999) 999-99-99" value={phone} onChange={e=>setPhone(formatPhone(e.target.value))} disabled={pending}/></label></div>
      <label>Предпочтительный способ связи<select value={method} onChange={e=>setMethod(e.target.value)} disabled={pending}>{contactMethods.map(m=><option key={m}>{m}</option>)}</select></label>
      <label className="check"><input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)} disabled={pending}/><span>Согласен на <Link href="/consent/" target="_blank" rel="noopener noreferrer">обработку персональных данных</Link> по <Link href="/privacy/" target="_blank" rel="noopener noreferrer">политике сайта</Link>.</span></label>
      <label className="check"><input type="checkbox" checked={ads} onChange={e=>setAds(e.target.checked)} disabled={pending}/><span>Хочу получать рекламные сообщения — <Link href="/marketing-consent/" target="_blank" rel="noopener noreferrer">необязательно</Link>.</span></label>
      {liveOrders&&<><label className="honeypot" aria-hidden="true">Сайт<input tabIndex={-1} autoComplete="off" value={website} onChange={e=>setWebsite(e.target.value)}/></label><SpamChallenge onToken={setToken} attempt={attempt}/></>}
      {error&&<p className="error" role="alert">{error}</p>}{demo&&<p className="demo-notice" role="status">Поля заполнены корректно. Это демонстрация: заявка не отправлена и скидка не оформлена.</p>}
      <button type="submit" className="button exit-submit" disabled={pending||(liveOrders&&!token)}>{pending?'Отправляем…':'Получить скидку 400 рублей'}</button>
    </form>}
    <p className="offer-terms">{discountTerms||'Условия применения скидки и совмещения с другими акциями уточняются при согласовании заказа.'}</p>
  </dialog>;
}
