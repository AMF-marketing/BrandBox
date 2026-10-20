import {Catalog} from '@/components/site';
import Link from 'next/link';
import {legacyCategories} from '@/lib/catalog';
import {pageMetadata,breadcrumbData} from '@/lib/seo';
export const metadata=pageMetadata('Каталог печатей, штампов и оснасток в Новосибирске','Автоматические, карманные и ручные печати, штампы, факсимиле, краска и штемпельные подушки. Каталог Брендбокс с фотографиями, характеристиками и ценами.','/catalog/');
export default function Page(){return <section className="section page-section"><h1>Каталог печатей и штампов</h1><p className="intro">Выберите модель по назначению, типу оснастки и цене. Для штампов указана начальная стоимость.</p><nav className="service-links" aria-label="Разделы каталога">{Object.entries(legacyCategories).map(([slug,c])=><Link key={slug} href={'/catalog/'+slug+'/'}>{c.title}</Link>)}</nav><Catalog/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbData([{name:'Главная',path:'/'},{name:'Каталог',path:'/catalog/'}]))}}/></section>}
