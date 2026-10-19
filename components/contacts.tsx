import {OrderButton} from '@/components/site';
import {contacts,mapLink,mapEmbed} from '@/lib/contacts';
export function ContactDetails(){return <address className="contact-details"><div><span>Телефон</span><a href={'tel:'+contacts.phone}>{contacts.phoneLabel}</a></div><div><span>Электронная почта</span><a href={'mailto:'+contacts.email}>{contacts.email}</a></div><div className="contact-address"><span>Адрес</span><p>{contacts.address}</p></div><div className="contact-hours"><span>График работы:</span><div><p>{contacts.hours.weekdays}</p><p>{contacts.hours.weekend}</p></div></div></address>}
export function ContactMap(){return <div className="contact-map"><iframe src={mapEmbed} title="Карта: Новосибирск, улица Ипподромская, 31" width="100%" height="420" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen/><a href={mapLink} target="_blank" rel="noopener noreferrer">Открыть в Яндекс Картах ↗</a></div>}

export function ContactContent(){return <div className="contact-layout"><div className="contact-summary"><ContactDetails/><OrderButton className="button contact-order">Обсудить заказ ↗</OrderButton></div><ContactMap/></div>}
