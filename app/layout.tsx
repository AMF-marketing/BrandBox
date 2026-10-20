import type {Metadata} from 'next';
import './globals.css';
import {Shell} from '@/components/site';
import {origin} from '@/lib/catalog';
export const metadata:Metadata={metadataBase:new URL(origin),icons:{icon:'/logo.png'},title:{default:'Изготовление печатей и штампов в Новосибирске | Брендбокс',template:'%s | Брендбокс'},description:'Изготовление печатей и штампов в Новосибирске: для ИП, ООО и врачей, факсимиле подписи, оснастки и расходники. Каталог с ценами и согласование макета.',robots:{index:true,follow:true},verification:{...(process.env.NEXT_PUBLIC_YANDEX_VERIFICATION?{yandex:process.env.NEXT_PUBLIC_YANDEX_VERIFICATION}:{}),...(process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION?{google:process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION}:{})}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="ru"><body><Shell>{children}</Shell></body></html>}
