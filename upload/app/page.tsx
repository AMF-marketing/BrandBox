import {ContactContent} from '@/components/contacts';
import {pageMetadata,businessData} from '@/lib/seo';
import Link from 'next/link';
import {Catalog,OrderButton,ProductPhoto} from '@/components/site';
import {faqs,products} from '@/lib/catalog';
export const metadata=pageMetadata('Изготовление печатей и штампов в Новосибирске','Печати для ИП, ООО и врачей, штампы и факсимиле подписи в Новосибирске. Оснастки, краска и штемпельные подушки. Фотографии, цены и согласование макета.','/');
export default function Home(){return <>
  <section className="hero section">
    <div className="hero-copy">
      <div className="eyebrow">НОВОСИБИРСК</div>
      <h1>Печати<br/>и <span className="accent">штампы</span><span className="hero-location">в Новосибирске</span></h1>
      <p className="hero-description">Изготовление печатей для ИП, ООО и врачей.<br/>Штампы и факсимиле по согласованному макету.</p>
      <div className="hero-actions"><Link className="button" href="#catalog">Выбрать продукцию ↗</Link><OrderButton className="button secondary">Обсудить заказ</OrderButton></div>
    </div>
    <div className="hero-visual"><ProductPhoto product={products.find(p=>p.slug==='colop')!} priority/></div>
  </section>
  <section className="section catalog-section" id="catalog">
    <div className="section-heading"><h2>Каталог продукции</h2></div>
    <Catalog/>
  </section>
  <section className="section landing-about" id="about"><div className="section-heading"><h2>Печати для ваших задач</h2></div><p>Изготавливаем печати, штампы и факсимиле для ИП, организаций и специалистов.<br/>Поможем подобрать оснастку и подготовить макет.</p><nav className="service-links" aria-label="Печати по назначению"><Link href="/catalog/pechati-ip/">Печати для ИП</Link><Link href="/catalog/pechati-ooo/">Печати для ООО</Link><Link href="/catalog/pechati-vrachey/">Печать врача</Link><Link href="/catalog/faksimile/">Факсимиле подписи</Link><Link href="/catalog/shtampy/">Штампы для документов</Link><Link href="/catalog/osnastki/">Оснастки и расходники</Link></nav></section>
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
    <img className="custom-logo" src="/logo.png" width="235" height="236" alt=""/>
  </div></section>
  <section className="section landing-delivery" id="delivery">
    <div className="section-heading"><h2>Получение и оплата</h2></div>
    <div className="delivery-grid">
      <article className="delivery-card"><h3>Сроки</h3><p>Срок изготовления согласуем после проверки макета и уточнения заказа.</p><p className="delivery-note">Если заказ нужен к определённой дате, сообщите об этом заранее.</p></article>
      <article className="delivery-card"><h3>Получение</h3><p>Способ, место и время получения согласуем при оформлении заказа.</p><p className="delivery-note">Возможность и стоимость доставки уточняются отдельно.</p></article>
      <article className="delivery-card"><h3>Оплата</h3><p>Итоговую стоимость, способ и порядок оплаты согласуем до начала изготовления.</p><p className="delivery-note">Для организации уточним возможность оплаты по счёту и состав документов.</p></article>
    </div>
  </section>
  <section className="section faq" id="faq">
    <div className="section-heading"><h2>Вопросы и ответы</h2></div>
    <div className="faq-list">{faqs.map(([q,a])=><details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div>
    <OrderButton className="button secondary faq-action">Задать вопрос ↗</OrderButton>
  </section>
  <section className="section contact-block" id="contacts"><div className="section-heading">
    <h2>Контакты</h2>
  </div><ContactContent/></section>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(businessData)}}/>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'FAQPage',mainEntity:faqs.map(([name,text])=>({'@type':'Question',name,acceptedAnswer:{'@type':'Answer',text}}))})}}/>
</>}
