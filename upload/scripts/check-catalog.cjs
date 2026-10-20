const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto'),assert=require('node:assert/strict'),ts=require('typescript');
const root=path.resolve(__dirname,'..');
const compiled=ts.transpileModule(fs.readFileSync(path.join(root,'lib/catalog.ts'),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
const box={exports:{},process,Intl,URL};vm.runInNewContext(compiled,box);
const {products,catalogGroups,formatPrice,legacyCategories}=box.exports;
const source=JSON.parse(fs.readFileSync(path.join(root,'CATALOG-SOURCE.json'),'utf8'));
const pricing=JSON.parse(fs.readFileSync(path.join(root,'PRICE-UPDATE.json'),'utf8'));
const rows=new Map(source.rawCards.map(row=>[row.title.split(' - ')[0],row]));
assert.equal(rows.size,19);assert.equal(products.length,19);assert.equal(new Set(products.map(p=>p.slug)).size,19);
for(const p of products){
 const row=rows.get(p.name);assert.ok(row,'Unexpected model: '+p.name);
 const price=row.title.split(' - ')[1];const change=pricing.items.find(item=>item.slug===p.slug);assert.ok(change);assert.equal(change.before,Number(price.replace(/\D/g,'')));assert.equal(change.after,change.before+100);assert.equal(p.price,change.after);assert.equal(p.priceFrom,price.startsWith('от'));
 assert.ok(formatPrice(p).includes(String(p.price).slice(-3)));assert.ok(p.images.length>0);
 const originalUrls=new Set(source.rawCards.filter(r=>r.title.split(' - ')[0]===p.name).map(r=>r.image));
 for(const image of p.originalImages){const asset=source.photos.find(a=>a.file===image);assert.ok(asset&&originalUrls.has(asset.source),'Wrong photo: '+p.name)}
}
for(const asset of source.photos){const file=path.join(root,'public',asset.file);assert.ok(fs.existsSync(file));assert.equal(crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'),asset.sha256)}
assert.equal(JSON.stringify(catalogGroups.map(g=>products.filter(p=>p.group===g).length)),JSON.stringify([3,9,3,4]));
assert.equal(products.find(p=>p.slug==='mouse').images.length,1);assert.equal(products.find(p=>p.slug==='tablet').images.length,1);assert.equal(Object.keys(legacyCategories).length,6);
console.log(JSON.stringify({products:19,prices:'previous price + 100 RUB for all 19 items',names:'match source',original_photos:source.photos.length,photo_hashes:'passed',category_counts:[3,9,3,4],duplicate_galleries_removed:2,legacy_category_routes:6,status:'passed'}));

const edits=JSON.parse(fs.readFileSync(path.join(root,'IMAGE-PROCESSING.json'),'utf8'));
for(const asset of edits.records){assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'public',asset.edited))).digest('hex'),asset.editedSha256)}
for(const p of products)assert.equal(JSON.stringify(p.images),JSON.stringify([...new Set(p.originalImages.map(s=>edits.records.find(r=>r.original===s).edited))]));
assert.equal(new Set(edits.records.map(r=>r.edited)).size,17);console.log('17 transparent product images and all product mappings passed');
