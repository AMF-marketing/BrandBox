import {origin} from '@/lib/catalog';
export const dynamic='force-static';
export default function robots(){return {rules:{userAgent:'*',allow:'/',disallow:'/api/'},sitemap:origin+'/sitemap.xml'}}
