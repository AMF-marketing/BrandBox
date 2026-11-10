import Link from 'next/link';
import {OrderButton,ProductPhoto} from './site';
import {products} from '@/lib/catalog';
import {partnerUrl} from '@/lib/campaigns';
function OfferIcon({kind}:{kind:'pen'|'gift'|'growth'|'pair'}){
  const paths={pen:<><path d="m7 23 2-7L23 2l7 7-14 14-7 2Z"/><path d="m20 5 7 7M5 29h22"/></>,gift:<><path d="M4 13h24v7H4zM7 20v10h18V20M16 13v17"/><path d="M16 13C4 13 5 1 12 4c3 1 4 9 4 9Zm0 0c12 0 11-12 4-9-3 1-4 9-4 9Z"/></>,growth:<><path d="M4 27h25M7 22v-5m8 5V12m8 10V6M5 11l8-6 7 2 8-5M23 2h5v5"/></>,pair:<><path d="M5 7h9v14H5zM18 13h9v14h-9zM4 25h11M17 30h11M7 4h5M20 10h5"/></>};
  return <svg className="offer-icon" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[kind]}</svg>;
}
export function Offers(){return <section className="section offers-section" id="offers"><div className="section-heading"><h2>Больше возможностей для вашего бизнеса</h2></div><div className="offers-grid">
  <article className="offer-card offer-logo"><div className="offer-top"><OfferIcon kind="pen"/></div><h3>Печать + логотип</h3><p>Разработка фирменного логотипа вместе с заказом печати.</p><div className="offer-action"><OrderButton offerId="logo" className="text-button">Подробнее ↗</OrderButton></div></article>
  <article className="offer-card offer-gift"><div className="offer-top"><OfferIcon kind="gift"/></div><h3>Ваш бренд в шоколаде</h3><p>Шоколадная объёмная копия вашего логотипа или товара — подарок клиентам. При заказе печати — промокод от партнёра.</p><div className="offer-action">{partnerUrl&&<Link className="text-button" href={partnerUrl} target="_blank" rel="noopener noreferrer">Подробнее ↗</Link>}</div></article>
  <article className="offer-card offer-marketing"><div className="offer-top"><OfferIcon kind="growth"/></div><h3>Маркетинг для бизнеса</h3><p>Стратегия, сайт, логотип и продвижение для развития бизнеса.</p><div className="offer-action"><OrderButton offerId="marketing" className="text-button">Обсудить проект ↗</OrderButton></div></article>
  <article className="offer-card offer-bundle"><div className="offer-top"><span className="bundle-discount">−15%</span></div><div className="bundle-products" aria-label="Автоматическая и карманная оснастки"><ProductPhoto product={products.find(p=>p.slug==='colop')!}/><span aria-hidden="true">+</span><ProductPhoto product={products.find(p=>p.slug==='mouse')!}/></div><h3>Комплект печатей</h3><p>Скидка на автоматическую и карманную печать при покупке вместе.</p><div className="offer-action"><OrderButton offerId="bundle" className="text-button">Заказать комплект ↗</OrderButton></div></article>
</div></section>}
