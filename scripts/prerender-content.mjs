import {existsSync, readFileSync, readdirSync, writeFileSync} from 'node:fs';
import {join, relative, resolve, sep} from 'node:path';
import {blogPosts} from '../src/blog-data.js';
import {products as catalogProducts} from '../src/products-full-data.js';
import {manuals} from '../src/downloads-data.js';

const root = resolve(import.meta.dirname, '..');
const output = join(root, 'public', '_legacy');
const ignored = new Set(['.git', '.next', 'dist', 'node_modules', 'public', 'temp']);
const site = 'https://trolink-tek.com';

const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const stripHtml = value => String(value || '').replace(/<[^>]*>/g, ' ').replace(/\$\{[^}]*\}/g, '').replace(/&(?:amp|nbsp|mdash|ndash|rsquo|ldquo|rdquo|quot);/g, ' ').replace(/\s+/g, ' ').trim();
const inline = value => escapeHtml(value)
  .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]+)\)/g, '<a href="$2">$1</a>')
  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  .replace(/`([^`]+)`/g, '<code>$1</code>');

function markdownToHtml(markdown) {
  const lines = markdown.replace(/^---[\s\S]*?---\s*/, '').split(/\n## Image plan\b/)[0].split(/\r?\n/);
  if (/^#\s/.test(lines[0] || '')) lines.shift();
  let html = '', list = '', table = [];
  const closeList = () => { if (list) { html += `</${list}>`; list = ''; } };
  const flushTable = () => {
    if (!table.length) return;
    const rows = table.filter(row => !row.every(cell => /^:?-+:?$/.test(cell.trim())));
    if (rows.length > 1) html += `<div class="article-table-wrap"><table><thead><tr>${rows[0].map(cell => `<th>${inline(cell.trim())}</th>`).join('')}</tr></thead><tbody>${rows.slice(1).map(row => `<tr>${row.map(cell => `<td>${inline(cell.trim())}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    table = [];
  };
  for (const raw of lines) {
    const line = raw.trim();
    if (line.startsWith('|') && line.endsWith('|')) { closeList(); table.push(line.slice(1, -1).split('|')); continue; }
    flushTable();
    if (!line) { closeList(); continue; }
    if (line.startsWith('# ')) { closeList(); html += `<h1>${inline(line.slice(2))}</h1>`; continue; }
    if (line.startsWith('## ')) { closeList(); html += `<h2>${inline(line.slice(3))}</h2>`; continue; }
    if (line.startsWith('### ')) { closeList(); html += `<h3>${inline(line.slice(4))}</h3>`; continue; }
    if (/^[-*] /.test(line)) { if (list !== 'ul') { closeList(); list = 'ul'; html += '<ul>'; } html += `<li>${inline(line.slice(2))}</li>`; continue; }
    if (/^\d+\. /.test(line)) { if (list !== 'ol') { closeList(); list = 'ol'; html += '<ol>'; } html += `<li>${inline(line.replace(/^\d+\. /, ''))}</li>`; continue; }
    if (line.startsWith('> ')) { closeList(); html += `<blockquote>${inline(line.slice(2))}</blockquote>`; continue; }
    closeList(); html += `<p>${inline(line)}</p>`;
  }
  closeList(); flushTable();
  return html;
}

function walk(directory, files = []) {
  for (const entry of readdirSync(directory, {withFileTypes: true})) {
    if (ignored.has(entry.name) || entry.name.startsWith('.qa-')) continue;
    const absolute = join(directory, entry.name);
    if (entry.isDirectory()) walk(absolute, files);
    else if (entry.isFile() && entry.name === 'index.html') files.push(absolute);
  }
  return files;
}

function metaValue(html, expression, fallback = '') { return html.match(expression)?.[1] || fallback; }
function pageFrame(sourceHtml, title, description, canonical, body, jsonLd = '', preserveExistingArticle = false) {
  let html = sourceHtml;
  if (/<title>[\s\S]*?<\/title>/i.test(html)) html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  else html = html.replace('</head>', `<title>${escapeHtml(title)}</title></head>`);
  if (/<meta\s+name=["']description["'][^>]*>/i.test(html)) html = html.replace(/<meta\s+name=["']description["'][^>]*>/i, `<meta name="description" content="${escapeHtml(description)}">`);
  else html = html.replace('</head>', `<meta name="description" content="${escapeHtml(description)}"></head>`);
  if (/<link\s+rel=["']canonical["'][^>]*>/i.test(html)) html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${escapeHtml(canonical)}">`);
  else html = html.replace('</head>', `<link rel="canonical" href="${escapeHtml(canonical)}"></head>`);
  if (!/<style[^>]+id=["']ssr-fallback-style["']/i.test(html)) html = html.replace('</head>', `<style id="ssr-fallback-style">.ssr-seo-content{min-height:100vh;background:#fff;color:#0a1830;font-family:Manrope,Arial,sans-serif}.ssr-seo-content .header{height:76px;display:flex;align-items:center;gap:32px;padding:0 max(24px,calc((100vw - 1240px)/2));background:#06172d;color:#fff}.ssr-seo-content .brand{margin-right:auto}.ssr-seo-content .brand img{width:190px;max-height:44px;object-fit:contain;filter:brightness(0) invert(1)}.ssr-seo-content nav{display:flex;gap:24px;font-size:14px}.ssr-seo-content nav a{color:#fff}.ssr-seo-content .btn{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:0 20px;border-radius:6px;background:#0869ff;color:#fff;font-weight:700}.ssr-seo-content .ssr-content{max-width:1240px;margin:0 auto;padding:90px 28px 120px}.ssr-seo-content .ssr-content .section-label{color:#0869ff;font-size:11px;font-weight:800;letter-spacing:.16em;text-transform:uppercase}.ssr-seo-content .ssr-content h1{max-width:900px;margin:14px 0 20px;font-size:clamp(38px,5vw,64px);line-height:1.05;letter-spacing:-.045em}.ssr-seo-content .ssr-content>p{max-width:760px;color:#627086;font-size:17px;line-height:1.75}.ssr-seo-content .ssr-links{display:flex;flex-wrap:wrap;gap:14px;margin-top:34px}.ssr-seo-content .ssr-links a{color:#0869ff;font-weight:700}.ssr-seo-content footer{padding:44px max(24px,calc((100vw - 1240px)/2));background:#030e1c;color:#8fa0b7;font-size:12px}@media(max-width:760px){.ssr-seo-content .header{height:auto;min-height:68px;padding:14px 20px;flex-wrap:wrap;gap:16px}.ssr-seo-content nav{order:3;width:100%;justify-content:space-between;gap:12px;font-size:12px}.ssr-seo-content .header>.btn{margin-left:auto}.ssr-seo-content .ssr-content{padding:58px 22px 84px}}</style></head>`);
  if (jsonLd && !preserveExistingArticle) html = html.replace('</head>', `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script></head>`);
  if (!preserveExistingArticle) {
    const mount = html.match(/<div\s+id=["']([^"']+)["']\s*>\s*<\/div>/i)?.[1];
    if (mount) html = html.replace(new RegExp(`<div\\s+id=["']${mount}["']\\s*>\\s*<\\/div>`, 'i'), `<div id="${mount}"><div class="ssr-seo-content">${body}</div></div>`);
    else html = html.replace(/<body([^>]*)>/i, `<body$1><div class="ssr-seo-content">${body}</div>`);
  }
  return html;
}

function genericBody(sourceHtml, sourceFile, description, title) {
  const scriptPath = sourceHtml.match(/<script[^>]+src=["']([^"']+)["']/i)?.[1]?.split('?')[0];
  const scriptFile = scriptPath ? join(root, scriptPath.replace(/^\//, '')) : '';
  const source = scriptFile && existsSync(scriptFile) ? readFileSync(scriptFile, 'utf8') : '';
  const h1Raw = source.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1];
  const h1 = stripHtml(h1Raw) || title.replace(/\s*[|–-]\s*TrolinkTek.*$/i, '').trim();
  return `<header class="header"><a class="brand" href="/"><img src="/assets/trolinktek-logo.png" alt="TrolinkTek"></a><nav><a href="/products/">Products</a><a href="/oem-odm/">OEM/ODM</a><a href="/solutions/">Solutions</a><a href="/blog/">Blog</a><a href="/about/">About</a></nav><a class="btn" href="/#quote">Contact</a></header><main class="ssr-content"><p class="section-label">TrolinkTek</p><h1>${escapeHtml(h1)}</h1><p>${escapeHtml(description)}</p><div class="ssr-links"><a href="/products/">Explore products</a><a href="/oem-odm/">Discuss an OEM/ODM project</a><a href="/#quote">Contact our team</a></div></main><footer>Shenzhen TrolinkTek Technology Co., Ltd. · Connected-drive products engineered for your market.</footer>`;
}

function articleBody(post) {
  const path = post.contentPath ? join(root, post.contentPath.replace(/^\//, '')) : '';
  const markdown = path && existsSync(path) ? readFileSync(path, 'utf8') : '';
  const content = markdown ? markdownToHtml(markdown) : `<p>${escapeHtml(post.intro || post.excerpt)}</p>${(post.sections || []).map(section => `<section><h2>${escapeHtml(section[0])}</h2><p>${escapeHtml(section[1])}</p></section>`).join('')}`;
  const hasMarkdownFaq = /^##\s+(?:FAQ|Frequently asked questions)\s*$/im.test(markdown);
  const faq = post.faq?.length && !hasMarkdownFaq ? `<section><h2>Frequently asked questions</h2>${post.faq.map(([question, answer]) => `<h3>${escapeHtml(question)}</h3><p>${escapeHtml(answer)}</p>`).join('')}</section>` : '';
  const requestedRelated = post.relatedLinks?.map(([title, url]) => {
    const slug = url.split('/').filter(Boolean).pop();
    const item = blogPosts.find(candidate => candidate.slug === slug);
    return item ? {...item, title} : null;
  }).filter(Boolean).slice(0, 3);
  const related = requestedRelated?.length ? requestedRelated : blogPosts.filter(item => item.slug !== post.slug).slice(0, 3);
  const relatedHtml = `<nav aria-label="Related articles"><h2>Related articles</h2><ul>${related.map(item => `<li><a href="/blog/${escapeHtml(item.slug)}/">${escapeHtml(item.title)}</a></li>`).join('')}</ul></nav>`;
  return `<main><article><header><p>${escapeHtml(post.category)} · ${escapeHtml(post.date)} · ${escapeHtml(post.readTime)}</p><h1>${escapeHtml(post.title)}</h1><p>${escapeHtml(post.intro || post.excerpt)}</p><p class="article-byline">By ${escapeHtml(post.author || 'TrolinkTek Editorial Team')} · Published ${escapeHtml(post.date)} · Updated ${escapeHtml(post.updatedAt || post.date)}</p><img src="${escapeHtml(post.image)}" alt="${escapeHtml(post.imageAlt || post.title)}"></header><div class="article-longform">${content}${faq}</div><aside><a href="/products/">Explore products</a> · <a href="/oem-odm/">Discuss an OEM/ODM project</a> · <a href="/#quote">Contact TrolinkTek</a></aside>${relatedHtml}</article></main>`;
}

function productBody(product) {
  const specs = (product.specs || []).map(spec => `<div><dt>${escapeHtml(spec.label)}</dt><dd>${escapeHtml(spec.value)}</dd></div>`).join('');
  const gallery = [...new Set([product.image, ...(product.gallery || [])])].map((image, index) => `<img src="${escapeHtml(image)}" alt="${escapeHtml(product.title)} official product image ${index + 1}" loading="lazy">`).join('');
  return `<main><article><header><p>${escapeHtml(product.category)}</p><h1>${escapeHtml(product.title)}</h1><p>Review the published specifications and official product images. Confirm current compatibility, availability and customization scope with TrolinkTek before ordering.</p><img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.title)} product image"></header><section><h2>Published specifications</h2><dl>${specs || `<div><dt>Specifications</dt><dd>Request the current specification sheet.</dd></div>`}</dl></section><section><h2>Official product gallery</h2>${gallery}</section><section><h2>Request product details</h2><p>Ask for the latest specification sheet, compatibility information and OEM/ODM options for your market.</p><a href="/oem-odm/">Discuss an OEM/ODM project</a> · <a href="/#quote">Contact TrolinkTek</a></section></article></main>`;
}

function productsCatalogBody() {
  const visibleProducts = catalogProducts.filter(product => !['Bluetooth Adapters', 'WiFi Dongles', 'Wireless Modules'].includes(product.category));
  const cards = visibleProducts.map(product => {
    const url = product.local_url || `/products/catalog/${product.slug}/`;
    return `<article class="catalog-card"><a class="catalog-image" href="${escapeHtml(url)}"><img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.title)}" loading="lazy"><span>${escapeHtml(product.category)}</span></a><div><h3>${escapeHtml(product.title)}</h3><p>Specifications and availability should be confirmed for your project.</p><div class="card-links"><a href="${escapeHtml(url)}">View details →</a></div></div></article>`;
  }).join('');
  return `<header class="header"><a class="brand" href="/"><img src="/assets/trolinktek-logo.png" alt="TrolinkTek"></a><nav><a class="active" href="/products/">Products</a><a href="/oem-odm/">OEM/ODM</a><a href="/solutions/">Solutions</a><a href="/blog/">Blog</a><a href="/about/">About</a></nav><a class="btn small" href="/#quote">Get a Quote</a></header><main><section class="catalog-hero"><div><div class="crumb"><a href="/">Home</a><span>/</span><span>Products</span></div><h1>TrolinkTek CarPlay Adapters, AI Boxes and Smart Car Screens</h1><p>Explore automotive connectivity and wireless hardware platforms from TrolinkTek. Shortlist a model, then discuss specifications, supply and OEM/ODM options.</p><div class="actions"><a class="btn" href="#catalog">Browse Products</a><a class="btn ghost" href="/oem-odm/">Discuss OEM/ODM</a></div></div><img src="/assets/products-apple-color-carplay-banner.png" alt="TrolinkTek connected-car product platforms"></section><section class="catalog" id="catalog"><div class="catalog-side"><p class="section-label">Product center</p><h2>Find the right platform.</h2><p>Compare product categories and open a model page for published specifications and images.</p></div><div class="catalog-results"><div class="results-head"><div><h2>All Products</h2><p>Complete local product catalog from TrolinkTek.</p></div><b>${visibleProducts.length} products</b></div><div class="product-catalog-grid">${cards}</div></div></section><section class="catalog-cta"><div><p class="section-label light">Need help selecting?</p><h2>Send us your target market and product requirements.</h2><p>Ask for a product shortlist, compatibility review or current specification sheet.</p></div><a class="btn" href="/#quote">Request a Product Recommendation</a></section></main><footer><div class="footer-brand"><img src="/assets/trolinktek-logo.png" alt="TrolinkTek"><p>Connected-drive products engineered for your market.</p></div><div><b>Products</b><a href="/products/">Product catalog</a><a href="/downloads/">Downloads</a></div><div><b>Partnership</b><a href="/oem-odm/">OEM/ODM</a><a href="/solutions/">Solutions</a></div><div><b>Contact</b><a href="/#quote">Request a recommendation</a></div><p class="copyright">Shenzhen TrolinkTek Technology Co., Ltd. &copy; All Rights Reserved.</p></footer>`;
}

function renderPage(sourceFile) {
  const rel = relative(root, sourceFile).split(sep).join('/');
  const route = rel === 'index.html' ? '/' : `/${rel.replace(/\/index\.html$/, '')}/`;
  const destination = join(output, rel);
  if (!existsSync(destination)) return false;
  let sourceHtml = readFileSync(destination, 'utf8');
  const originalTitle = metaValue(sourceHtml, /<title>([\s\S]*?)<\/title>/i, 'TrolinkTek | Connected-car products');
  let description = metaValue(sourceHtml, /<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i, 'Connected-car products, engineering support and OEM/ODM programs from TrolinkTek.');
  let title = originalTitle, canonical = `${site}${route}`, body, schema = null, preserveExistingArticle = false;
  const articleMatch = route.match(/^\/blog\/([^/]+)\/$/);
  const manualMatch = route.match(/^\/downloads\/([^/]+)\/$/);
  const productMatch = route.match(/^\/products\/catalog\/([^/]+)\/$/);

  if (route === '/blog/') {
    const cards = blogPosts.map(post => `<article><img src="${escapeHtml(post.image)}" alt="${escapeHtml(post.imageAlt || post.title)}" loading="lazy"><p>${escapeHtml(post.category)} · ${escapeHtml(post.date)}</p><h2><a href="/blog/${escapeHtml(post.slug)}/">${escapeHtml(post.title)}</a></h2><p>${escapeHtml(post.excerpt)}</p><a href="/blog/${escapeHtml(post.slug)}/">Read article</a></article>`).join('');
    title = originalTitle;
    body = `<main><header><h1>Insights for connected-car buyers.</h1><p>${escapeHtml(description)}</p></header><section><h2>Latest articles</h2><div>${cards}</div></section><section><h2>Need a product recommendation?</h2><p>Share your market, target vehicle segment and customization requirements.</p><a href="/products/">Explore products</a> · <a href="/oem-odm/">Discuss an OEM/ODM project</a></section></main>`;
  } else if (articleMatch) {
    const post = blogPosts.find(item => item.slug === articleMatch[1]);
    if (post) {
      title = post.metaTitle || `${post.title} | TrolinkTek Blog`;
      description = post.excerpt;
      preserveExistingArticle = /<main[^>]*>[\s\S]*?<article\b/i.test(sourceHtml) && /<script\s+type=["']application\/ld\+json["']/i.test(sourceHtml);
      if (!preserveExistingArticle) {
        body = articleBody(post);
        schema = {'@context':'https://schema.org','@type':'BlogPosting',headline:post.title,description:post.excerpt,image:new URL(post.image,site).href,datePublished:post.publishAt || post.date,dateModified:post.updatedAt || post.publishAt || post.date,author:{'@type':'Organization',name:post.author || 'TrolinkTek Editorial Team'},publisher:{'@type':'Organization',name:'TrolinkTek',logo:{'@type':'ImageObject',url:`${site}/assets/trolinktek-logo.png`}},mainEntityOfPage:{'@type':'WebPage','@id':canonical}};
        if (post.faq?.length) schema = {'@context':'https://schema.org','@graph':[schema,{'@type':'FAQPage',mainEntity:post.faq.map(([question,answer])=>({'@type':'Question',name:question,acceptedAnswer:{'@type':'Answer',text:answer}}))}]};
      }
    }
  } else if (productMatch) {
    const product = catalogProducts.find(item => item.slug === productMatch[1]);
    if (product) {
      title = `${product.title} | TrolinkTek`;
      body = productBody(product);
      canonical = `${site}${product.local_url || route}`;
    }
  } else if (manualMatch) {
    const manual = manuals.find(item => item.slug === manualMatch[1]);
    if (manual) {
      title = `${manual.title} | TrolinkTek Downloads`;
      const summary = `${manual.summary} View available language versions and download the official TrolinkTek manual.`;
      description = summary;
      body = `<main><header><h1>${escapeHtml(manual.title)}</h1><p>${escapeHtml(manual.summary)}</p></header><section><h2>Available languages</h2><ul>${manual.languages.map(code => `<li>${escapeHtml(code.toUpperCase())}: <a href="${escapeHtml(manual.files?.[code] || '#')}" download>View or download ${escapeHtml(code.toUpperCase())} manual</a></li>`).join('')}</ul></section><section><h2>Need help with this product?</h2><p>Contact TrolinkTek support with the model and language you need.</p><a href="mailto:sales03@trolinkiot.com">Email technical support</a></section></main>`;
    }
  }

  if (route === '/products/') {
    body = productsCatalogBody();
    title = 'Products | CarPlay Adapters, AI Boxes & Smart Screens | TrolinkTek';
  }
  if (!body && !preserveExistingArticle) body = genericBody(sourceHtml, sourceFile, description, title);
  writeFileSync(destination, pageFrame(sourceHtml, title, description, canonical, body, schema, preserveExistingArticle), 'utf8');
  return true;
}

let prerendered = 0;
for (const file of walk(root)) if (renderPage(file)) prerendered += 1;
console.log(`Added server-rendered SEO content to ${prerendered} HTML routes (including ${blogPosts.length} articles).`);
