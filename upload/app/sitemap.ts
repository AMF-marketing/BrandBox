import {origin,products,legacyCategories} from '@/lib/catalog';
export const dynamic='force-static';
export default function sitemap(){return ['','/catalog','/about','/delivery','/contacts',...products.map(p=>'/catalog/'+p.slug),...Object.keys(legacyCategories).map(slug=>'/catalog/'+slug)].map(p=>({url:origin+p+'/',lastModified:new Date('2026-10-20')}))}
