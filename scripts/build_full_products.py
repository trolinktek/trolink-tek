from pathlib import Path
import json, re, unicodedata, collections, shutil

ROOT=Path(__file__).resolve().parents[1]
raw=json.loads((ROOT/'research/site-products.json').read_text(encoding='utf-8'))
details=json.loads((ROOT/'research/product-details-crawl.json').read_text(encoding='utf-8'))
by_url={x['source_url']:x for x in details}
freq=collections.Counter(img for x in details for img in x.get('detail_images',[]))
main_images=json.loads((ROOT/'assets/products/manifest.json').read_text(encoding='utf-8'))

def clean(s): return re.sub(r'\s+',' ',s.replace('��',':').replace('：',':')).strip()
def category(t):
    l=t.lower()
    if 'carplay adapter' in l or 'hyundai carplay' in l:return 'CarPlay Adapters'
    if 'carplay box' in l:return 'CarPlay AI Boxes'
    if 'car monitor' in l:return 'Smart Car Screens'
    if 'bluetooth adapter' in l:return 'Bluetooth Adapters'
    if 'wifi dongle' in l:return 'WiFi Dongles'
    if l.startswith('chip:'):return 'Wireless Modules'
    return 'Other'
def slugify(t,pid):
    t=unicodedata.normalize('NFKD',t).encode('ascii','ignore').decode().lower()
    t=re.sub(r'[^a-z0-9]+','-',t).strip('-')[:70]
    return f'{t}-{pid}'
def grab(pattern,t):
    m=re.search(pattern,t,re.I);return clean(m.group(1)) if m else ''
def specs(t):
    out=[]
    pairs=[
      ('Model',r'(?:Adapter|Box|Monitor)\s*:\s*([^:]+?)(?=\s+CPU|\s+Chip|\s+System|\s+Screen|$)'),
      ('CPU',r'CPU\s*:\s*([^:]+?)(?=\s+System|\s+Screen|$)'),
      ('System',r'System\s*:\s*([^:]+?)(?=\s+Screen|$)'),
      ('Screen size',r'Screen size\s*:\s*([^:]+)$'),
      ('Chip',r'(?:Bluetooth Adapter|WiFi Dongle|^Chip)\s*:\s*(?:Chip\s*)?([^\s:]+)'),
      ('Wireless speed',r'(\d+\s*M(?:p)?bs)'),
      ('Dimensions',r'(\d+(?:\.\d+)?\s*\*\s*\d+(?:\.\d+)?(?:\s*\*\s*\d+(?:\.\d+)?)?\s*mm)'),
    ]
    for label,pat in pairs:
      val=grab(pat,t)
      if val: out.append({'label':label,'value':val.replace('Mpbs','Mbps')})
    bands=[]
    if re.search(r'2\.4G',t,re.I):bands.append('2.4 GHz')
    if re.search(r'5\.8G|5G',t,re.I):bands.append('5.8 GHz')
    if bands:out.append({'label':'Bands','value':' + '.join(bands)})
    interfaces=[]
    for label,pat in [('USB 2.0',r'USB\s*2\.0'),('USB',r'\bUSB\b'),('Type-C',r'TYPC-C|TYPE-C'),('PCIe',r'PCIe'),('SDIO',r'SDIO'),('M.2',r'M\.2')]:
      if re.search(pat,t,re.I) and label not in interfaces: interfaces.append(label)
    if interfaces:out.append({'label':'Interface','value':' / '.join(interfaces)})
    bt=grab(r'Bluetooth\s*([0-9.]+)',t)
    if bt:out.append({'label':'Bluetooth','value':bt})
    return out

products=[];seen=set()
hidden_categories={'Bluetooth Adapters','WiFi Dongles','Wireless Modules'}
for item in raw:
    title=clean(item['title']);key=(title,item['image'])
    if title == 'Hyundai CarPlay Wholesale & Distribution': continue
    if category(title) in hidden_categories: continue
    if key in seen:continue
    seen.add(key);pid=re.search(r'/(\d+)\.html',item['source_url']).group(1)
    detail=by_url.get(item['source_url'],{})
    imgs=[main_images.get(pid,'https://www.trolinktek.com'+item['image'])]
    imgs += [x for x in detail.get('detail_images',[]) if freq[x] <= 4]
    imgs=list(dict.fromkeys(imgs))
    slug=slugify(title,pid)
    local=f'/products/catalog/{slug}/'
    products.append({'id':pid,'slug':slug,'local_url':local,'title':title,'category':category(title),'image':imgs[0],'gallery':imgs,'specs':specs(title),'updated':detail.get('updated',''),'source_url':local,'original_source':item['source_url']})

(ROOT/'src/products-full-data.js').write_text('export const products = '+json.dumps(products,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
template=ROOT/'products/product-template.html';catalog=ROOT/'products/catalog';catalog.mkdir(exist_ok=True)
for p in products:
    dest=catalog/p['slug'];dest.mkdir(exist_ok=True);shutil.copyfile(template,dest/'index.html')
print(json.dumps({'products':len(products),'gallery_images':sum(len(p['gallery']) for p in products),'with_specs':sum(bool(p['specs']) for p in products),'detail_pages':len(list(catalog.glob('*/index.html')))},ensure_ascii=False,indent=2))
