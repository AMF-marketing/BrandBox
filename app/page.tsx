import {ContactContent} from '@/components/contacts';
import {Offers} from '@/components/offers';
import {Reviews} from '@/components/reviews';
import {pageMetadata,businessData} from '@/lib/seo';
import Link from 'next/link';
import {Catalog,OrderButton,ProductPhoto} from '@/components/site';
import {faqs,products} from '@/lib/catalog';
export const metadata=pageMetadata('Изготовление печатей и штампов в Новосибирске за 30 минут','Срочное изготовление печатей без доплаты за скорость. Для ИП, ООО, самозанятых и медработников. Поможем с макетом, выберем оснастку. Каталог с ценами.','/');
export default function Home(){return <>
  <section className="hero section hero-refresh">
    <div className="hero-copy">
      <h1><span className="hero-title-line">Изготовление печатей</span> <span className="hero-title-line">и штампов в Новосибирске</span> <span className="hero-speed">за <strong>30 минут</strong></span></h1>
      <p className="hero-description">Срочный заказ без доплаты за скорость. Выберите подходящую оснастку, а мы поможем с макетом и оформлением.</p>
      <div className="hero-actions"><OrderButton className="button">Заказать печать</OrderButton><Link className="button secondary" href="#catalog">Каталог и цены ↗</Link></div>
    </div>
    <div className="hero-visual"><ProductPhoto product={products.find(p=>p.slug==='colop')!} priority/></div>
  </section>
  <Offers/>
  <section className="section catalog-section" id="catalog">
    <div className="section-heading"><h2>Каталог продукции</h2></div>
    <Catalog/>
  </section>
  <section className="section landing-about" id="about"><div className="section-heading"><h2>Печати для ваших задач</h2></div><p>Изготавливаем печати, штампы и факсимиле для ИП, ООО, самозанятых и медработников.<br/>Поможем подобрать оснастку и подготовить макет.</p><nav className="service-links" aria-label="Печати по назначению"><Link href="/catalog/pechati-ip/">Печати для ИП</Link><Link href="/catalog/pechati-ooo/">Печати для ООО</Link><Link href="/catalog/pechati-vrachey/">Печать врача</Link><Link href="/catalog/pechati-samozanyatyh/">Печать самозанятому</Link><Link href="/catalog/faksimile/">Факсимиле подписи</Link><Link href="/catalog/shtampy/">Штампы для документов</Link><Link href="/catalog/osnastki/">Оснастки и расходники</Link><Link href="/catalog/shtempelnye-podushki/">Штемпельные подушки</Link></nav></section>
  <section className="dark-section" id="order"><div className="section process">
    <div className="section-heading"><h2>Как оформить заказ</h2></div>
    <div className="steps">{[
      ['Выберите продукцию','Определите назначение печати, тип штампа или оснастки.'],
      ['Укажите данные','Напишите текст оттиска, реквизиты и пожелания к макету.'],
      ['Согласуйте заказ','Проверьте макет, стоимость, срок изготовления и способ получения.'],
      ['Получите продукцию','Получение заказа — по согласованным условиям.']
    ].map(([title,text],i)=><div key={title}><span className="step-number">0{i+1}</span><h3>{title}</h3><p>{text}</p></div>)}</div>
  </div></section>
  <section className="section custom-section"><div className="custom">
    <div><h2>Печать по вашему макету</h2><p>Укажите текст, размеры и назначение оттиска. Проверим макет и согласуем изготовление.</p><OrderButton product="Индивидуальный макет" className="button light">Обсудить макет ↗</OrderButton></div>
    <img className="custom-logo" src="/brandbox-symbol.svg" width="92" height="103" alt=""/>
  </div></section>
  <section className="section faq" id="faq">
    <div className="section-heading"><h2>Вопросы и ответы</h2></div>
    <div className="faq-list">{faqs.map(([q,a])=><details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div>
    <OrderButton className="button secondary faq-action">Задать вопрос ↗</OrderButton>
  </section>
  <Reviews/>
  <section className="section contact-block" id="contacts"><div className="section-heading">
    <h2>Контакты</h2>
  </div><ContactContent/></section>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(businessData)}}/>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'FAQPage',mainEntity:faqs.map(([name,text])=>({'@type':'Question',name,acceptedAnswer:{'@type':'Answer',text}}))})}}/>
</>}
