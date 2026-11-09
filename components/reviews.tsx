import {contacts} from '@/lib/contacts';
const samples=[
  ['Анна К.','Выбирала между двумя оснастками. Объяснили разницу без уговоров брать подороже. В итоге взяла карманную — удобно носить в сумке.'],
  ['Дмитрий С.','В макете заметили ошибку в реквизитах ещё до изготовления. Хорошо, что прислали на проверку: я сам её пропустил.'],
  ['Марина В.','Нужна была печать для работы на выезде. Помогли подобрать компактный корпус, текст получился читаемым.'],
  ['Алексей П.','Отправил свой эскиз, но мелкие буквы на нём сливались. Предложили поправить расстояния. После согласования стало заметно аккуратнее.']
];
const reviewLink='mailto:'+contacts.email+'?subject='+encodeURIComponent('Отзыв о BrandBox')+'&body='+encodeURIComponent('Имя и первая буква фамилии:\n\nВаш отзыв:\n\nМожно ли опубликовать ваше имя и текст на сайте: да / нет');
export function Reviews(){return <section className="section reviews-section" id="reviews"><div className="reviews-heading"><div><h2>Отзывы</h2><p className="review-draft-note">Образцы текстов для согласования. Это не опубликованные отзывы клиентов.</p></div><a className="button secondary" href={reviewLink} aria-label="Оставить отзыв по электронной почте">Оставить отзыв ↗</a></div><div className="reviews-grid">{samples.map(([name,text])=><article className="review-card" key={name}><div className="review-meta"><h3>{name}</h3><span>Образец</span></div><p>{text}</p></article>)}</div></section>}
