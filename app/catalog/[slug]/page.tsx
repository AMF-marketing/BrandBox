import {notFound} from 'next/navigation';
import Link from 'next/link';
import {products,origin,formatPrice,legacyCategories} from '@/lib/catalog';
import {OrderButton,ProductGallery,Catalog} from '@/components/site';
export function generateStaticParams(){return [...products.map(p=>({slug:p.slug})),...Object.keys(legacyCategories).map(slug=>({slug}))]}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=products.find(p=>p.slug===slug),category=legacyCategories[slug];return {title:(p?.name||category?.title||'Каталог')+' в Новосибирске',description:p?.description||category?.description,alternates:{canonical:'/catalog/'+slug+'/'},...(p?{openGraph:{title:p.name+' — '+formatPrice(p),description:p.description,images:[p.images[0]]}}:{})}}
export default async function Page({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params,p=products.find(p=>p.slug===slug),category=legacyCategories[slug];
 if(!p){if(!category)notFound();return <section className="section page-section"><Link className="text-button" href="/catalog/">← Каталог</Link><h1>{category.title}</h1><p className="intro">{category.description}</p>{category.groups.length?<Catalog key={slug} allowedGroups={category.groups}/>:<OrderButton product="Индивидуальный макет">Обсудить макет ↗</OrderButton>}</section>}
 const related=products.filter(q=>q.slug!==p.slug&&q.group===p.group).slice(0,3);
 const specifications=p.group==='Расходники'?[['Категория',p.group],['Тип',p.kind],[p.slug==='kraska-25ml'?'Объём':'Размер',p.spec]]:[['Категория',p.group],['Тип оснастки',p.kind],['Особенности',p.spec],['Макет',p.slug==='faksimile'?'По образцу подписи':'Согласуется при заказе']];
 const offer=p.priceFrom?{'@type':'AggregateOffer',lowPrice:p.price,priceCurrency:'RUB',url:origin+'/catalog/'+p.slug+'/'}:{'@type':'Offer',price:p.price,priceCurrency:'RUB',url:origin+'/catalog/'+p.slug+'/'};
 return <section className="section page-section"><Link className="text-button" href="/catalog/">← Каталог</Link>
  <div className="product-detail"><div className="detail-art"><ProductGallery key={p.slug} product={p}/></div><div>
   <h1>{p.name}</h1><p className="intro">{p.description}</p><p className="price">{formatPrice(p)}</p>
   {p.priceFrom&&<p className="muted">Начальная стоимость. Итоговая цена зависит от размера и макета.</p>}
   <OrderButton product={p.name}>Заказать ↗</OrderButton>
   <dl className="product-specs">{specifications.map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
   <div className="detail-options"><h2>Как заказать</h2><p>{p.group==='Расходники'?'Укажите нужную позицию и количество. Совместимость, наличие и способ получения уточняются при согласовании.':'Укажите текст оттиска и реквизиты. Макет, срок изготовления и способ получения согласуются до начала работ.'}</p></div>
  </div></div>
  {related.length>0&&<><h2>Также в каталоге</h2><div className="related">{related.map(q=><Link key={q.slug} href={'/catalog/'+q.slug+'/'}>{q.name} · {formatPrice(q)} ↗</Link>)}</div></>}
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'Product',name:p.name,description:p.description,image:p.images.map(src=>origin+src),url:origin+'/catalog/'+p.slug+'/',offers:offer})}}/>
 </section>
}
