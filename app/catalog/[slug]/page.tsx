import {notFound} from 'next/navigation';
import Link from 'next/link';
import {products,origin,formatPrice,legacyCategories} from '@/lib/catalog';
import {OrderButton,ProductGallery,Catalog} from '@/components/site';
import {pageMetadata,productSeoTitle,productSeoDescription,categoryContent,breadcrumbData} from '@/lib/seo';
export function generateStaticParams(){return [...products.map(p=>({slug:p.slug})),...Object.keys(legacyCategories).map(slug=>({slug}))]}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=products.find(p=>p.slug===slug),category=categoryContent[slug];return p?pageMetadata(productSeoTitle(p),productSeoDescription(p),'/catalog/'+slug+'/',p.images[0]):category?pageMetadata(category.title,category.intro,'/catalog/'+slug+'/'):{title:'Страница не найдена',robots:{index:false,follow:true}};}
export default async function Page({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params,p=products.find(p=>p.slug===slug),category=legacyCategories[slug],content=categoryContent[slug];
 if(!p){if(!category)notFound();return <section className="section page-section"><Link className="text-button" href="/catalog/">← Каталог</Link><h1>{content.title}</h1><p className="intro">{content.intro}</p><div className="category-copy">{content.sections.map(([title,text])=><article key={title}><h2>{title}</h2><p>{text}</p></article>)}</div>{category.groups.length?<Catalog key={slug} allowedGroups={category.groups}/>:<OrderButton product="Индивидуальный макет">Обсудить макет ↗</OrderButton>}<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbData([{name:"Главная",path:"/"},{name:"Каталог",path:"/catalog/"},{name:category.title,path:"/catalog/"+slug+"/"}]))}}/></section>}
 const related=products.filter(q=>q.slug!==p.slug&&q.group===p.group).slice(0,3);
 const specifications=p.group==='Расходники'?[['Категория',p.group],['Тип',p.kind],[p.slug==='kraska-25ml'?'Объём':'Размер',p.spec]]:[['Категория',p.group],['Тип оснастки',p.kind],['Особенности',p.spec],['Макет',p.slug==='faksimile'?'По образцу подписи':'Согласуется при заказе']];
 const offer=p.priceFrom?{'@type':'AggregateOffer',lowPrice:p.price,priceCurrency:'RUB',url:origin+'/catalog/'+p.slug+'/'}:{'@type':'Offer',price:p.price,priceCurrency:'RUB',url:origin+'/catalog/'+p.slug+'/'};
 return <section className="section page-section"><Link className="text-button" href="/catalog/">← Каталог</Link>
  <div className="product-detail"><div className="detail-art"><ProductGallery key={p.slug} product={p}/></div><div>
   <h1>{p.name}</h1><p className="intro">{p.description}</p>{p.slug==='faksimile'&&<p className="product-context">Факсимиле подписи — штамп, который воспроизводит ваш образец подписи. Изготавливаем в Новосибирске по согласованному размеру и макету.</p>}<p className="price">{formatPrice(p)}</p>
   {p.priceFrom&&<p className="muted">Начальная стоимость. Итоговая цена зависит от размера и макета.</p>}
   <OrderButton product={p.name}>Заказать ↗</OrderButton>
   <dl className="product-specs">{specifications.map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
   <div className="detail-options"><h2>Как заказать</h2><p>{p.group==='Расходники'?'Укажите нужную позицию и количество. Совместимость, наличие и способ получения уточняются при согласовании.':'Укажите текст оттиска и реквизиты. Макет, срок изготовления и способ получения согласуются до начала работ.'}</p></div>
  </div></div>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbData([{name:"Главная",path:"/"},{name:"Каталог",path:"/catalog/"},{name:p.name,path:"/catalog/"+p.slug+"/"}]))}}/>
  {related.length>0&&<><h2>Также в каталоге</h2><div className="related">{related.map(q=><Link key={q.slug} href={'/catalog/'+q.slug+'/'}>{q.name} · {formatPrice(q)} ↗</Link>)}</div></>}
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'Product',sku:p.slug,name:p.name,description:p.description,image:p.images.map(src=>origin+src),url:origin+'/catalog/'+p.slug+'/',offers:offer})}}/>
 </section>
}
