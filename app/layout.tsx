import type {Metadata} from 'next';
import './globals.css';
import {Shell} from '@/components/site';
import {origin} from '@/lib/catalog';
export const metadata:Metadata={metadataBase:new URL(origin),icons:{icon:"/logo.png"},title:{default:'Брендбокс — печати и штампы в Новосибирске',template:'%s | Брендбокс'},description:'Печати для ИП, ООО и специалистов, штампы и оснастки. Понятный выбор и согласование индивидуального макета в Новосибирске.',openGraph:{title:'Брендбокс — печати и штампы в Новосибирске',description:'Печати и штампы в Новосибирске',locale:'ru_RU',type:'website',images:['/brandbox-og.svg']},robots:{index:false,follow:false}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="ru"><body><Shell>{children}</Shell></body></html>}
