from pathlib import Path
import re, html, json

text = Path('research/source-trolinktek.html').read_text(encoding='utf-8', errors='ignore')
items = []
for m in re.finditer(r'<img[^>]+(?:data-original|src)="([^"]+)"[^>]+alt="([^"]*)"[^>]*>', text, re.I):
    image, alt = m.groups()
    tail = text[m.end():m.end()+1800]
    title_m = re.search(r'class="[^"]*(?:proTitle|p_title)[^"]*"[^>]*>(.*?)</div>', tail, re.I|re.S)
    href_m = re.search(r'href="(/products/\d+\.html)"', tail, re.I)
    title = re.sub('<[^>]+>', ' ', title_m.group(1)) if title_m else alt
    title = ' '.join(html.unescape(title).split())
    if href_m and title and image not in {'/template/eyou/pc/style/images/loading.gif'}:
        item = {'title': title, 'image': image, 'source_url': 'https://www.trolinktek.com' + href_m.group(1)}
        if item not in items: items.append(item)

Path('research/site-products.json').write_text(json.dumps(items, ensure_ascii=False, indent=2), encoding='utf-8')
def clean_title(title):
    return title.replace('��', ':').replace('：', ':').replace('  ', ' ').strip()

def category(title):
    low = title.lower()
    if 'carplay adapter' in low or 'hyundai carplay' in low: return 'CarPlay Adapters'
    if 'carplay box' in low: return 'CarPlay AI Boxes'
    if 'car monitor' in low: return 'Smart Car Screens'
    if 'bluetooth adapter' in low: return 'Bluetooth Adapters'
    if 'wifi dongle' in low: return 'WiFi Dongles'
    if low.startswith('chip:'): return 'Wireless Modules'
    return 'Other'

normalized=[]
seen=set()
for item in items:
    key=(clean_title(item['title']),item['image'])
    if key in seen: continue
    seen.add(key)
    normalized.append({
        'title': clean_title(item['title']),
        'category': category(item['title']),
        'image': 'https://www.trolinktek.com'+item['image'],
        'source_url': item['source_url'],
    })

js='export const products = '+json.dumps(normalized,ensure_ascii=False,indent=2)+';\n'
Path('src/products-data.js').write_text(js,encoding='utf-8')
print(json.dumps(items, ensure_ascii=False, indent=2))
