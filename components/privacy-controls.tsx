'use client';
import Link from 'next/link';
import {useEffect,useState} from 'react';
import {getPrivacy,savePrivacy,privacyEvent} from '@/lib/browser-preferences';
import {mapEmbed,mapLink} from '@/lib/contacts';

export function CookieNotice(){
  const [visible,setVisible]=useState(false),[settings,setSettings]=useState(false),[maps,setMaps]=useState(false);
  useEffect(()=>{const sync=()=>{const choice=getPrivacy();setVisible(!choice);setMaps(choice?.maps||false)};sync();window.addEventListener(privacyEvent,sync);return()=>window.removeEventListener(privacyEvent,sync)},[]);
  useEffect(()=>{const reopen=()=>{setMaps(getPrivacy()?.maps||false);setSettings(true);setVisible(true)};window.addEventListener('brandbox-cookie-settings',reopen);return()=>window.removeEventListener('brandbox-cookie-settings',reopen)},[]);
  if(!visible)return null;
  return <aside className="cookie-notice" aria-label="Настройки файлов cookie">
    <button type="button" className="notice-close" aria-label="Закрыть уведомление cookie" onClick={()=>{if(getPrivacy()){setVisible(false);setSettings(false)}else savePrivacy(false)}}>×</button>
    <p>Мы используем файлы cookie для корректной работы сайта и улучшения пользовательского опыта. Подробнее — в <Link href="/privacy/">Политике обработки персональных данных</Link>.</p>
    {settings&&<div className="cookie-settings"><p>Необходимые настройки сохраняют ваш выбор. Аналитика и реклама не подключены.</p><label><input type="checkbox" checked={maps} onChange={e=>setMaps(e.target.checked)}/>Разрешить загрузку карты Яндекса</label><small>Карта — внешний сервис. До разрешения запросы к Яндексу не отправляются.</small></div>}
    <div className="cookie-actions">{settings?<><button className="button" onClick={()=>savePrivacy(maps)}>Сохранить выбор</button><button className="text-button" onClick={()=>savePrivacy(false)}>Только необходимые</button></>:<><button className="button" onClick={()=>savePrivacy(false)}>Хорошо</button><button className="text-button" onClick={()=>setSettings(true)}>Настроить</button></>}</div>
  </aside>;
}
export function CookieSettingsButton(){return <button className="footer-cookie" onClick={()=>window.dispatchEvent(new Event('brandbox-cookie-settings'))}>Настройки cookie</button>}
export function ConsentMap(){
  const [allowed,setAllowed]=useState(false);
  useEffect(()=>{const sync=()=>setAllowed(getPrivacy()?.maps===true);sync();window.addEventListener(privacyEvent,sync);return()=>window.removeEventListener(privacyEvent,sync)},[]);
  return <div className="contact-map">{allowed?<iframe src={mapEmbed} title="Карта: Новосибирск, улица Ипподромская, 31" width="100%" height="420" loading="lazy" referrerPolicy="no-referrer" allowFullScreen/>:<div className="map-consent"><svg width="40" height="40" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M26 13c0 8-10 16-10 16S6 21 6 13a10 10 0 0 1 20 0Z" stroke="currentColor" strokeWidth="2"/><circle cx="16" cy="13" r="3" stroke="currentColor" strokeWidth="2"/></svg><h3>Ипподромская, 31</h3><p>Карта Яндекса загрузится после вашего разрешения. Внешний сервис может использовать свои cookie.</p><button className="button secondary" onClick={()=>savePrivacy(true)}>Разрешить и показать карту</button></div>}<a href={mapLink} target="_blank" rel="noopener noreferrer">Открыть в Яндекс Картах ↗</a></div>;
}
