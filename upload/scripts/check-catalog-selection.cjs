const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),ts=require('typescript');
const root=path.resolve(__dirname,'..');
function read(file){const box={exports:{},process,Intl,URL};vm.runInNewContext(ts.transpileModule(fs.readFileSync(path.join(root,file),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,box);return box.exports}
const {products,catalogGroups}=read('lib/catalog.ts'),{selectProducts}=read('lib/catalog-selection.ts');let checks=0;
function check(value){assert.ok(value);checks++}
check(selectProducts(products,'Все','','default').length===19);
for(const group of catalogGroups)check(selectProducts(products,group,'','default').every(p=>p.group===group));
check(selectProducts(products,'Все','  mouse  ','default')[0].slug==='mouse');
check(selectProducts(products,'Все','90x50','default').some(p=>p.slug==='podushka-m1'));
check(selectProducts(products,'Все','90×50','default').some(p=>p.slug==='podushka-m1'));
check(selectProducts(products,'Штампы','MOUSE','default').length===0);
check(selectProducts(products,'Все','несуществующийтовар','default').length===0);
for(const sort of ['price-asc','price-desc']){const list=selectProducts(products,'Все','',sort);check(list.every((p,i)=>i===0||(sort==='price-asc'?list[i-1].price<=p.price:list[i-1].price>=p.price)))}
const original=products.map(p=>p.slug).join();selectProducts(products,'Все','','price-asc');check(products.map(p=>p.slug).join()===original);
check(selectProducts(products,'Расходники','подушка','price-asc').length===3);
const home=fs.readFileSync(path.join(root,'app/page.tsx'),'utf8');check(home.includes('<Catalog/>')&&!home.includes('limit={6}'));
for(const id of ['catalog','about','delivery','contacts'])check(home.includes('id="'+id+'"'));
console.log(JSON.stringify({catalog_selection_checks:checks,status:'passed'}));
