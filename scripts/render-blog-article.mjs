import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {dirname, join, resolve} from 'node:path';
import {blogPosts} from '../src/blog-data.js';

const slug = process.argv[2];
const post = blogPosts.find(item => item.slug === slug);
if (!post) throw new Error(`Unknown blog slug: ${slug}`);

const root = resolve(import.meta.dirname, '..');
const markdown = await readFile(join(root, post.contentPath.replace(/^\//, '')), 'utf8');
const article = markdown.replace(/^---[\s\S]*?---\s*/, '').replace(/^# [^\r\n]+\r?\n+/, '');

const escapeHtml = value => value.replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
const inline = value => escapeHtml(value)
  .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>')
  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  .replace(/\*(.+?)\*/g, '<em>$1</em>')
  .replace(/`([^`]+)`/g, '<code>$1</code>');

function markdownToHtml(source) {
  const lines = source.split(/\r?\n/);
  let html = '', list = '', table = [];
  const closeList = () => { if (list) html += `</${list}>`; list = ''; };
  const flushTable = () => {
    if (!table.length) return;
    const rows = table.filter(row => !row.every(cell => /^:?-+:?$/.test(cell.trim())));
    if (rows.length > 1) {
      html += '<div class="article-table-wrap"><table><thead><tr>' + rows[0].map(cell => `<th>${inline(cell.trim())}</th>`).join('') + '</tr></thead><tbody>';
      html += rows.slice(1).map(row => '<tr>' + row.map(cell => `<td>${inline(cell.trim())}</td>`).join('') + '</tr>').join('');
      html += '</tbody></table></div>';
    }
    table = [];
  };
  for (const line of lines) {
    if (line.trim().startsWith('|')) {
      closeList();
      table.push(line.trim().replace(/^\||\|$/g, '').split('|'));
      continue;
    }
    flushTable();
    if (!line.trim()) { closeList(); continue; }
    if (line.startsWith('# ')) { closeList(); html += `<h1>${inline(line.slice(2))}</h1>`; continue; }
    if (line.startsWith('## ')) { closeList(); html += `<h2>${inline(line.slice(3))}</h2>`; continue; }
    if (line.startsWith('### ')) { closeList(); html += `<h3>${inline(line.slice(4))}</h3>`; continue; }
    if (/^[-*] /.test(line)) {
      if (list !== 'ul') { closeList(); list = 'ul'; html += '<ul>'; }
      html += `<li>${inline(line.slice(2))}</li>`;
      continue;
    }
    if (/^\d+\. /.test(line)) {
      if (list !== 'ol') { closeList(); list = 'ol'; html += '<ol>'; }
      html += `<li>${inline(line.replace(/^\d+\. /, ''))}</li>`;
      continue;
    }
    closeList();
    html += `<p>${inline(line)}</p>`;
  }
  closeList();
  flushTable();
  return html;
}

const canonical = `https://trolink-tek.com/blog/${post.slug}/`;
const faqSchema = post.faq?.length ? {
  '@type': 'FAQPage', mainEntity: post.faq.map(([question, answer]) => ({
    '@type': 'Question', name: question, acceptedAnswer: {'@type':'Answer', text:answer}
  }))
} : null;
const blogSchema = {
  '@type':'BlogPosting', headline:post.title, description:post.excerpt,
  image:`https://trolink-tek.com${post.image}`, datePublished:post.publishAt,
  dateModified:post.updatedAt || post.publishAt,
  author:{'@type':'Organization',name:post.author},
  publisher:{'@type':'Organization',name:'TrolinkTek',logo:{'@type':'ImageObject',url:'https://trolink-tek.com/assets/trolinktek-logo.png'}},
  mainEntityOfPage:{'@type':'WebPage','@id':canonical}
};
const structuredData = faqSchema ? {'@context':'https://schema.org','@graph':[blogSchema,faqSchema]} : {'@context':'https://schema.org',...blogSchema};
const related = [
  ['Motorcycle CarPlay Channel Strategy for Distributors','/blog/motorcycle-carplay-channel-strategy/'],
  ['Motorcycle CarPlay Display vs. Phone Mount','/blog/motorcycle-carplay-display-vs-phone-mount/']
];

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(post.metaTitle)}</title><meta name="description" content="${escapeHtml(post.excerpt)}"><link rel="canonical" href="${canonical}">
<meta property="og:type" content="article"><meta property="og:title" content="${escapeHtml(post.title)}"><meta property="og:description" content="${escapeHtml(post.excerpt)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="https://trolink-tek.com${post.image}">
<link rel="stylesheet" href="/src/style.css"><link rel="stylesheet" href="/src/blog-article.css"><link rel="stylesheet" href="/src/blog-longform.css">
<script type="application/ld+json">${JSON.stringify(structuredData).replace(/</g,'\\u003c')}</script></head><body>
<header class="header"><a class="brand" href="/"><img src="/assets/trolinktek-logo.png" alt="TrolinkTek"></a><nav><a href="/products/">Products</a><a href="/oem-odm/">OEM/ODM</a><a href="/solutions/">Solutions</a><a class="active" href="/blog/">Blog</a><a href="/about/">About</a></nav><a class="btn small" href="/#quote">Request a Review</a><button class="menu" aria-label="Open menu">&#9776;</button></header>
<main><article><header class="article-hero"><div class="crumb"><a href="/">Home</a><span>/</span><a href="/blog/">Blog</a><span>/</span><span>${escapeHtml(post.category)}</span></div><div class="article-meta"><span>${escapeHtml(post.category)}</span><time datetime="${post.publishAt}">${escapeHtml(post.date)}</time><span>${escapeHtml(post.readTime)}</span><span>${escapeHtml(post.author)}</span></div><h1>${escapeHtml(post.title)}</h1><p>${escapeHtml(post.excerpt)}</p></header><div class="article-image"><img src="${post.image}" alt="${escapeHtml(post.imageAlt)}" width="1672" height="945"></div><div class="article-longform">${markdownToHtml(article)}</div></article>
<section class="article-related"><div class="section-head"><div><p class="section-label light">Continue researching</p><h2>Related buyer insights.</h2></div><a href="/blog/">View all Blog posts &rarr;</a></div><div>${related.map(([title,url])=>`<article><span>Motorcycle CarPlay</span><h3>${escapeHtml(title)}</h3><a href="${url}">Read article &rarr;</a></article>`).join('')}</div></section>
<section class="blog-cta"><div><p class="section-label light">Technical validation</p><h2>Review a motorcycle display program.</h2><p>Share your intended mount, target channel and evidence questions for a scoped validation discussion.</p></div><a class="btn" href="https://trolink-tek.com/oem-odm/">Discuss OEM/ODM</a></section></main>
<footer><div class="footer-brand"><img src="/assets/trolinktek-logo.png" alt="TrolinkTek"><p>Connected-drive products engineered for your market.</p></div><div><b>Products</b><a href="/products/">Product Center</a><a href="/solutions/">Solutions</a></div><div><b>Resources</b><a href="/downloads/">Downloads</a><a href="/blog/">Blog</a></div><div><b>Partnership</b><a href="/oem-odm/">OEM/ODM</a><a href="/#quote">Contact</a></div><p class="copyright">Shenzhen TrolinkTek Technology Co., Ltd. &copy; All Rights Reserved.</p></footer>
<script type="module" src="/src/global-nav.js?v=20260729-arabic-nav1"></script></body></html>`;

const output = join(root, 'blog', post.slug, 'index.html');
await mkdir(dirname(output), {recursive:true});
await writeFile(output, html, 'utf8');
console.log(`Rendered static, crawlable article page: ${output}`);
