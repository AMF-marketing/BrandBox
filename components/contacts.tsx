import {OrderButton} from '@/components/site';
import {contacts} from '@/lib/contacts';
import {ConsentMap} from './privacy-controls';
export function ContactDetails(){return <address className="contact-details"><div><span>Телефон</span><a href={'tel:'+contacts.phone}>{contacts.phoneLabel}</a></div><div><span>Электронная почта</span><a href={'mailto:'+contacts.email}>{contacts.email}</a></div><div className="contact-address"><span>Адрес</span><p>{contacts.address}</p></div><div className="contact-hours"><span>График работы:</span><div><p>{contacts.hours.weekdays}</p><p>{contacts.hours.weekend}</p></div></div></address>}
export function ContactMap(){return <ConsentMap/>}

export function ContactContent(){return <div className="contact-layout"><div className="contact-summary"><ContactDetails/><OrderButton className="button contact-order">Обсудить заказ ↗</OrderButton></div><ContactMap/></div>}
