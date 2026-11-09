/** Only confirmed offers. Detailed prices and promotion terms stay unset; partner destination confirmed by the owner. */
export const offers={
  logo:{label:'Печать + разработка логотипа'},
  chocolate:{label:'Печать + подарок вашим клиентам'},
  marketing:{label:'От печати до полноценного маркетинга'},
  bundle:{label:'−15% на комплект печатей',discountPercent:15},
  exit400:{label:'Скидка 400 ₽ / Exit Popup',discountRubles:400}
} as const;
export type OfferId=keyof typeof offers;
export type OrderSource='site'|'promotion'|'exit-popup';
export const discountTerms:string|null=null;
export const partnerUrl=(()=>{try{const u=new URL(process.env.NEXT_PUBLIC_CHOCOLATE_PARTNER_URL||'https://holmogoryconf.ru/');return u.protocol==='https:'&&!u.username&&!u.password?u.href:null}catch{return null}})();
export const contactMethods=['Телефон',...(process.env.NEXT_PUBLIC_TELEGRAM_ENABLED==='true'?['Telegram']:[]),...(process.env.NEXT_PUBLIC_WHATSAPP_ENABLED==='true'?['WhatsApp']:[])];
