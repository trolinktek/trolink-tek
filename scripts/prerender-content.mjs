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
  let html = '', list = '', table = [];
  const closeList = () => { if (list) { html += `</${list}>`; list = ''; } };
  const flushTable = () => {
    if (!table.length) return;
    const rows = table.filter(row => !row.every(cell => /^:?-+:?$/.test(cell.trim())));
    if (rows.length > 1) html += `<div class="ssr-table-wrap"><table><thead><tr>${rows[0].map(cell => `<th>${inline(cell.trim())}</th>`).join('')}</tr></thead><tbody>${rows.slice(1).map(row => `<tr>${row.map(cell => `<td>${inline(cell.trim())}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
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
function pageFrame(sourceHtml, title, description, canonical, body, jsonLd = '') {
  let html = sourceHtml;
  if (/<title>[\s\S]*?<\/title>/i.test(html)) html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  else html = html.replace('</head>', `<title>${escapeHtml(title)}</title></head>`);
  if (/<meta\s+name=["']description["'][^>]*>/i.test(html)) html = html.replace(/<meta\s+name=["']description["'][^>]*>/i, `<meta name="description" content="${escapeHtml(description)}">`);
  else html = html.replace('</head>', `<meta name="description" content="${escapeHtml(description)}"></head>`);
  if (/<link\s+rel=["']canonical["'][^>]*>/i.test(html)) html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${escapeHtml(canonical)}">`);
  else html = html.replace('</head>', `<link rel="canonical" href="${escapeHtml(canonical)}"></head>`);
  if (jsonLd) html = html.replace('</head>', `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script></head>`);
  const mount = html.match(/<div\s+id=["']([^"']+)["']\s*>\s*<\/div>/i)?.[1];
  if (mount) html = html.replace(new RegExp(`<div\\s+id=["']${mount}["']\\s*>\\s*<\\/div>`, 'i'), `<div id="${mount}"><div class="ssr-seo-content">${body}</div></div>`);
  else html = html.replace(/<body([^>]*)>/i, `<body$1><div class="ssr-seo-content">${body}</div>`);
  return html;
}

function genericBody(sourceHtml, sourceFile, description, title) {
  const scriptPath = sourceHtml.match(/<script[^>]+src=["']([^"']+)["']/i)?.[1]?.split('?')[0];
  const scriptFile = scriptPath ? join(root, scriptPath.replace(/^\//, '')) : '';
  const source = scriptFile && existsSync(scriptFile) ? readFileSync(scriptFile, 'utf8') : '';
  const h1Raw = source.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1];
  const h1 = stripHtml(h1Raw) || title.replace(/\s*[|–-]\s*TrolinkTek.*$/i, '').trim();
  const headings = [...source.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)].map(match => stripHtml(match[1])).filter(Boolean);
  const paragraphs = [...source.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)].map(match => stripHtml(match[1])).filter(text => text.length > 45 && !text.includes('${'));
  const sections = headings.slice(0, 8).map(heading => `<li>${escapeHtml(heading)}</li>`).join('');
  const supportingText = [...new Set(paragraphs)].slice(0, 10).map(text => `<p>${escapeHtml(text)}</p>`).join('');
  return `<main><header><h1>${escapeHtml(h1)}</h1><p>${escapeHtml(description)}</p></header>${sections ? `<section><h2>On this page</h2><ul>${sections}</ul></section>` : ''}<section><h2>Page overview</h2>${supportingText || `<p>${escapeHtml(description)}</p>`}</section></main>`;
}

function articleBody(post) {
  const path = post.contentPath ? join(root, post.contentPath.replace(/^\//, '')) : '';
  const markdown = path && existsSync(path) ? readFileSync(path, 'utf8') : '';
  const content = markdown ? markdownToHtml(markdown) : `<p>${escapeHtml(post.intro || post.excerpt)}</p>${(post.sections || []).map(section => `<section><h2>${escapeHtml(section[0])}</h2><p>${escapeHtml(section[1])}</p></section>`).join('')}`;
  const faq = post.faq?.length ? `<section><h2>Frequently asked questions</h2>${post.faq.map(([question, answer]) => `<h3>${escapeHtml(question)}</h3><p>${escapeHtml(answer)}</p>`).join('')}</section>` : '';
  const related = blogPosts.filter(item => item.slug !== post.slug).slice(0, 3);
  const relatedHtml = `<nav aria-label="Related articles"><h2>Related articles</h2><ul>${related.map(item => `<li><a href="/blog/${escapeHtml(item.slug)}/">${escapeHtml(item.title)}</a></li>`).join('')}</ul></nav>`;
  return `<main><article><header><p>${escapeHtml(post.category)} · ${escapeHtml(post.date)} · ${escapeHtml(post.readTime)}</p><h1>${escapeHtml(post.title)}</h1><p>${escapeHtml(post.intro || post.excerpt)}</p><img src="${escapeHtml(post.image)}" alt="${escapeHtml(post.imageAlt || post.title)}"></header><div class="article-content">${content}${faq}</div><aside><a href="/products/">Explore products</a> · <a href="/oem-odm/">Discuss an OEM/ODM project</a> · <a href="/#quote">Contact TrolinkTek</a></aside>${relatedHtml}</article></main>`;
}

function productBody(product) {
  const specs = (product.specs || []).map(spec => `<div><dt>${escapeHtml(spec.label)}</dt><dd>${escapeHtml(spec.value)}</dd></div>`).join('');
  const gallery = [...new Set([product.image, ...(product.gallery || [])])].map((image, index) => `<img src="${escapeHtml(image)}" alt="${escapeHtml(product.title)} official product image ${index + 1}" loading="lazy">`).join('');
  return `<main><article><header><p>${escapeHtml(product.category)}</p><h1>${escapeHtml(product.title)}</h1><p>Review the published specifications and official product images. Confirm current compatibility, availability and customization scope with TrolinkTek before ordering.</p><img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.title)} product image"></header><section><h2>Published specifications</h2><dl>${specs || `<div><dt>Specifications</dt><dd>Request the current specification sheet.</dd></div>`}</dl></section><section><h2>Official product gallery</h2>${gallery}</section><section><h2>Request product details</h2><p>Ask for the latest specification sheet, compatibility information and OEM/ODM options for your market.</p><a href="/oem-odm/">Discuss an OEM/ODM project</a> · <a href="/#quote">Contact TrolinkTek</a></section></article></main>`;
}

function renderPage(sourceFile) {
  const rel = relative(root, sourceFile).split(sep).join('/');
  const route = rel === 'index.html' ? '/' : `/${rel.replace(/\/index\.html$/, '')}/`;
  const destination = join(output, rel);
  if (!existsSync(destination)) return false;
  let sourceHtml = readFileSync(destination, 'utf8');
  const originalTitle = metaValue(sourceHtml, /<title>([\s\S]*?)<\/title>/i, 'TrolinkTek | Connected-car products');
  let description = metaValue(sourceHtml, /<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i, 'Connected-car products, engineering support and OEM/ODM programs from TrolinkTek.');
  let title = originalTitle, canonical = `${site}${route}`, body, schema = null;
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
      body = articleBody(post);
      schema = {'@context':'https://schema.org','@type':'BlogPosting',headline:post.title,description:post.excerpt,image:new URL(post.image,site).href,datePublished:post.publishAt || post.date,dateModified:post.updatedAt || post.publishAt || post.date,author:{'@type':'Organization',name:post.author || 'TrolinkTek Editorial Team'},publisher:{'@type':'Organization',name:'TrolinkTek',logo:{'@type':'ImageObject',url:`${site}/assets/trolinktek-logo.png`}},mainEntityOfPage:{'@type':'WebPage','@id':canonical}};
      if (post.faq?.length) schema = {'@context':'https://schema.org','@graph':[schema,{'@type':'FAQPage',mainEntity:post.faq.map(([question,answer])=>({'@type':'Question',name:question,acceptedAnswer:{'@type':'Answer',text:answer}}))}]};
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

  if (!body) body = genericBody(sourceHtml, sourceFile, description, title);
  writeFileSync(destination, pageFrame(sourceHtml, title, description, canonical, body, schema), 'utf8');
  return true;
}

let prerendered = 0;
for (const file of walk(root)) if (renderPage(file)) prerendered += 1;
console.log(`Added server-rendered SEO content to ${prerendered} HTML routes (including ${blogPosts.length} articles).`);
