import {blogPosts} from './blog-data.js';
import {initGlobalNav} from './global-nav.js?v=20260729-arabic-nav1';

const slug=location.pathname.split('/').filter(Boolean).pop();
const post=blogPosts.find(item=>item.slug===slug);
if(!post){location.replace('/blog/');throw new Error('Unknown article')}
if(!document.head.querySelector('link[href^="/src/blog-longform.css"]')){const longformStyles=document.createElement('link');longformStyles.rel='stylesheet';longformStyles.href='/src/blog-longform.css?v=20260830-article-style1';document.head.appendChild(longformStyles)}

const esc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const inline=s=>esc(s)
  .replace(/\[([^\]]+)\]\((\/[^)\s]+)\)/g,'<a href="$2">$1</a>')
  .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
  .replace(/`([^`]+)`/g,'<code>$1</code>');
function markdownToHtml(markdown){
  const lines=markdown.replace(/^---[\s\S]*?---\s*/,'').split(/\n## Image plan\b/)[0].split(/\r?\n/);
  let html='',list='',table=[];
  const close=()=>{if(list){html+=`</${list}>`;list=''}};
  const flush=()=>{if(!table.length)return;const rows=table.filter(r=>!r.every(c=>/^:?-+:?$/.test(c.trim())));if(rows.length>1)html+='<div class="article-table-wrap"><table><thead><tr>'+rows[0].map(c=>`<th>${inline(c.trim())}</th>`).join('')+'</tr></thead><tbody>'+rows.slice(1).map(r=>'<tr>'+r.map(c=>`<td>${inline(c.trim())}</td>`).join('')+'</tr>').join('')+'</tbody></table></div>';table=[]};
  for(const raw of lines){const line=raw.trim();
    if(line.startsWith('|')&&line.endsWith('|')){close();table.push(line.slice(1,-1).split('|'));continue}
    flush();if(!line){close();continue}
    if(line.startsWith('# ')){html+=`<h1>${inline(line.slice(2))}</h1>`;continue}
    if(line.startsWith('## ')){close();html+=`<h2>${inline(line.slice(3))}</h2>`;continue}
    if(line.startsWith('### ')){close();html+=`<h3>${inline(line.slice(4))}</h3>`;continue}
    if(/^[-*] /.test(line)){if(list!=='ul'){close();list='ul';html+='<ul>'}html+=`<li>${inline(line.slice(2))}</li>`;continue}
    if(/^\d+\. /.test(line)){if(list!=='ol'){close();list='ol';html+='<ol>'}html+=`<li>${inline(line.replace(/^\d+\. /,''))}</li>`;continue}
    if(line.startsWith('> ')){close();html+=`<blockquote>${inline(line.slice(2))}</blockquote>`;continue}
    html+=`<p>${inline(line)}</p>`;
  }close();flush();return html;
}

let body=`<p class="article-intro">${post.intro}</p>${post.sections.map((s,i)=>`<section><span>0${i+1}</span><h2>${s[0]}</h2><p>${s[1]}</p></section>`).join('')}`;

document.title=post.metaTitle||`${post.title} | TrolinkTek Blog`;
let meta=document.head.querySelector('meta[name="description"]')||document.head.appendChild(Object.assign(document.createElement('meta'),{name:'description'}));meta.content=post.excerpt;
const canonicalUrl=`https://www.trolinktek.com/blog/${post.slug}/`;
let canonical=document.head.querySelector('link[rel="canonical"]')||document.head.appendChild(Object.assign(document.createElement('link'),{rel:'canonical'}));canonical.href=canonicalUrl;
const schema={
  '@context':'https://schema.org','@type':'BlogPosting',headline:post.title,description:post.excerpt,
  image:new URL(post.image,'https://www.trolinktek.com').href,datePublished:post.publishAt||post.date,
  dateModified:post.updatedAt||post.publishAt||post.date,
  author:{'@type':'Organization',name:post.author||'TrolinkTek Editorial Team'},
  publisher:{'@type':'Organization',name:'TrolinkTek',logo:{'@type':'ImageObject',url:'https://www.trolinktek.com/assets/trolinktek-logo.png'}},
  mainEntityOfPage:{'@type':'WebPage','@id':canonicalUrl}
};
const structuredData=post.faq?.length?{'@context':'https://schema.org','@graph':[schema,{'@type':'FAQPage',mainEntity:post.faq.map(([question,answer])=>({'@type':'Question',name:question,acceptedAnswer:{'@type':'Answer',text:answer}}))}]}:schema;
document.head.appendChild(Object.assign(document.createElement('script'),{type:'application/ld+json',textContent:JSON.stringify(structuredData)}));
const related=blogPosts.filter(item=>item.slug!==post.slug).slice(0,3);
document.querySelector('#article-app').innerHTML=`
<header class="header"><a class="brand" href="/"><img src="/assets/trolinktek-logo.png" alt="TrolinkTek"></a><nav><a href="/products/">Products</a><a href="/#oem">OEM/ODM</a><a href="/#solutions">Solutions</a><a class="active" href="/blog/">Blog</a><a href="/about/">About</a></nav><a class="btn small" href="/#quote">Get a Quote</a><button class="menu" aria-label="Open menu">&#9776;</button></header>
<main><article><header class="article-hero"><div class="crumb"><a href="/">Home</a><span>/</span><a href="/blog/">Blog</a><span>/</span><span>${post.category}</span></div><div class="article-meta"><span>${post.category}</span><time datetime="${post.publishAt||''}">${post.date}</time><span>${post.readTime}</span><span>${post.author||'TrolinkTek Editorial Team'}</span></div><h1>${post.title}</h1><p>${post.excerpt}</p></header><div class="article-image"><img src="${post.image}" alt="${post.imageAlt||post.title}" width="1536" height="864"></div><div class="article-longform">${body}</div></article>
<section class="article-related"><div class="section-head"><div><p class="section-label light">Continue researching</p><h2>Related buyer insights.</h2></div><a href="/blog/">View all Blog posts &rarr;</a></div><div>${related.map(item=>`<article><span>${item.category}</span><h3>${item.title}</h3><a href="/blog/${item.slug}/">Read article &rarr;</a></article>`).join('')}</div></section>
<section class="blog-cta"><div><p class="section-label light">From research to RFQ</p><h2>Evaluate a product for your market.</h2><p>Tell us the target vehicle segment, sales channel and customization requirements.</p></div><a class="btn" href="/#quote">Start Your Project</a></section></main>
<footer><div class="footer-brand"><img src="/assets/trolinktek-logo.png" alt="TrolinkTek"><p>Connected-drive products engineered for your market.</p></div><div><b>Blog</b><a href="/blog/">All posts</a><a href="/blog/">Buying guides</a></div><div><b>Products</b><a href="/products/">Product Center</a><a href="/downloads/">Downloads</a></div><div><b>Contact</b><a href="mailto:sales03@trolinkiot.com">sales03@trolinkiot.com</a></div><p class="copyright">Shenzhen TrolinkTek Technology Co., Ltd. &copy; All Rights Reserved.</p></footer>`;
if(post.contentPath){fetch(post.contentPath).then(async response=>{if(!response.ok)return;const article=document.querySelector('.article-longform');if(article)article.innerHTML=markdownToHtml(await response.text())}).catch(()=>{});}
initGlobalNav();const header=document.querySelector('.header');document.querySelector('.menu').onclick=()=>header.classList.toggle('open');
