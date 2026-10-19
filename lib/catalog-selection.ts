import type {Product} from './catalog';
export type CatalogSort='default'|'price-asc'|'price-desc';
export function selectProducts(items:readonly Product[],group:string,query:string,sort:CatalogSort):Product[]{
 const normalize=(value:string)=>value.toLocaleLowerCase('ru-RU').replace(/ё/g,'е').replace(/[хx×]/g,'х').replace(/\s+/g,' ').trim();
 const words=normalize(query).split(' ').filter(Boolean);
 const result=items.filter(p=>(group==='Все'||p.group===group)&&words.every(word=>normalize([p.name,p.description,p.kind,p.spec,p.group].join(' ')).includes(word)));
 if(sort!=='default')result.sort((a,b)=>sort==='price-asc'?a.price-b.price:b.price-a.price);
 return result;
}
