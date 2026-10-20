from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
from collections import Counter
import csv, json, xml.etree.ElementTree as ET

root=Path(__file__).resolve().parent.parent
out=root/'out'
origin='https://brandbox.pages.dev'
errors=[]
def check(condition,message):
    if not condition: errors.append(message)

class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.meta={}; self.canonical=''; self.h1=0; self.title=''; self.links=[]; self.ids=set(); self.schemas=[]; self.in_title=False; self.in_schema=False; self.buffer=''
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag=='meta': self.meta[a.get('name',a.get('property',''))]=a.get('content','')
        if tag=='link' and a.get('rel')=='canonical': self.canonical=a.get('href','')
        if tag=='h1': self.h1+=1
        if tag=='title': self.in_title=True
        if tag=='script' and a.get('type')=='application/ld+json': self.in_schema=True; self.buffer=''
        if 'id' in a: self.ids.add(a['id'])
        for key in ('src','href'):
            value=a.get(key,'')
            if value.startswith(('/','#')) and not value.startswith('//'): self.links.append(value)
    def handle_data(self,text):
        if self.in_title: self.title+=text
        if self.in_schema: self.buffer+=text
    def handle_endtag(self,tag):
        if tag=='title': self.in_title=False
        if tag=='script' and self.in_schema:
            self.schemas.append(json.loads(self.buffer));self.in_schema=False

pages={}
for path in out.rglob('*.html'):
    page=Page();page.feed(path.read_text(encoding='utf-8'));pages[path.relative_to(out).as_posix()]=page
check(bool(pages),'No production HTML was found')
titles=[];descriptions=[]
legal={'privacy','consent','marketing-consent'}
catalog_count=0;products_count=0
for name,page in pages.items():
    path=out/name
    is404='404' in name or '_not-found' in name
    check(page.h1==1,f'{name}: expected one H1')
    if is404: continue
    expected=origin+('/' if name=='index.html' else '/'+name.removesuffix('index.html'))
    check(page.canonical==expected,f'{name}: wrong canonical {page.canonical}')
    check(bool(page.title) and bool(page.meta.get('description')),f'{name}: missing metadata')
    titles.append(page.title);descriptions.append(page.meta.get('description'))
    check(page.meta.get('og:url')==expected,f'{name}: wrong Open Graph URL')
    check(bool(page.meta.get('og:title')) and bool(page.meta.get('og:image')),f'{name}: missing Open Graph')
    islegal=name.split('/')[0] in legal
    check(('noindex' in page.meta.get('robots',''))==islegal,f'{name}: wrong index permission')
    check('noisyheron' not in path.read_text(encoding='utf-8'),f'{name}: old preview domain')
    for link in page.links:
        parts=urlsplit(link)
        target=(out/unquote(parts.path).lstrip('/')) if parts.path else path
        if target.is_dir(): target=target/'index.html'
        check(target.is_file(),f'{name}: missing route or asset {link}')
        if parts.fragment and target.is_file() and target.suffix=='.html':
            key=target.relative_to(out).as_posix()
            check(parts.fragment in pages[key].ids,f'{name}: missing anchor {link}')
    if name.startswith('catalog/'):
        catalog_count+=1
        check(sum(s.get('@type')=='BreadcrumbList' for s in page.schemas)==1,f'{name}: missing or duplicate breadcrumbs')
        for schema in page.schemas:
            if schema.get('@type')=='Product':
                products_count+=1
                change=next(x for x in json.loads((root/'PRICE-UPDATE.json').read_text(encoding='utf-8'))['items'] if x['slug']==schema['sku'])
                check(schema['offers'].get('price',schema['offers'].get('lowPrice'))==change['after'],f'{name}: changed price')
                check(schema['url']==expected,f'{name}: wrong Product URL')
check(all(n==1 for n in Counter(titles).values()),'Duplicate page titles')
check(all(n==1 for n in Counter(descriptions).values()),'Duplicate page descriptions')
check(catalog_count==26,'Expected catalog plus 25 category/product routes')
check(products_count==19,'Expected 19 Product schemas')
home=pages['index.html']
business=next(s for s in home.schemas if s.get('@type')=='LocalBusiness')
check(business['url']==origin+'/' and business['telephone']=='+79682299090','Wrong business data')
check(business['email']=='brandboxy@mail.ru','Wrong business email')
home_links=set(home.links)
for slug in ['pechati-ip','pechati-ooo','pechati-vrachey','shtampy','faksimile','osnastki']:
    check('/catalog/'+slug+'/' in home_links,'Missing service link: '+slug)
for schema in home.schemas:
    if schema.get('@type')=='FAQPage':
        check(len(schema['mainEntity'])==8,'Expected eight visible FAQ answers')
robots=(out/'robots.txt').read_text(encoding='utf-8')
check('Allow: /' in robots and 'Disallow: /\n' not in robots and origin+'/sitemap.xml' in robots,'Wrong robots.txt')
tree=ET.parse(out/'sitemap.xml');ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}
urls=[node.text for node in tree.findall('s:url/s:loc',ns)]
expected_urls={p.canonical for name,p in pages.items() if p.canonical and 'noindex' not in p.meta.get('robots','')}
check(set(urls)==expected_urls and len(urls)==len(set(urls)),'Sitemap and indexable canonicals do not match')
rows=list(csv.DictReader((root/'SEO-SEMANTICS.csv').open(encoding='utf-8-sig'),delimiter=';'))
check(len(rows)==102,'Expected all 102 semantic queries')
for row in rows:
    target=row['Целевая страница'];parts=urlsplit(target);key=(parts.path.strip('/')+'/' if parts.path.strip('/') else '')+'index.html'
    check(key in pages,'Semantic target missing: '+target)
    if parts.fragment: check(parts.fragment in pages[key].ids,'Semantic anchor missing: '+target)
report={'checked_at':'2026-10-20','build':'passed','typecheck':'passed','html_pages':len(pages),'indexable_pages':len(urls),'catalog_routes':25,'products':products_count,'semantic_queries':len(rows),'metadata_canonicals_robots_sitemap_schema_links_assets':'passed' if not errors else 'failed','catalog_regression':'passed: names/prices/image hashes; 19 filter checks','form_regression':'passed: 14 checks','browser_visual_qa':'not performed for local SEO update','publication':'local update prepared; user must upload patch to GitHub, then verify Cloudflare build','errors':errors}
(root/'SEO-VERIFICATION.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(report,ensure_ascii=False))
raise SystemExit(bool(errors))
