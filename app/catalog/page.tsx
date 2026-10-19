import {Catalog} from '@/components/site';
export const metadata={title:'Каталог печатей и штампов в Новосибирске',description:'Каталог Брендбокс: автоматические, карманные и ручные печати, штампы и расходники. Модели, фотографии и цены.',alternates:{canonical:'/catalog/'}};
export default function Page(){return <section className="section page-section"><h1>Каталог продукции</h1><p className="intro">Выберите модель. Для штампов указана начальная стоимость.</p><Catalog/></section>}
