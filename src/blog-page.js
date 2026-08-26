import {blogPosts,blogCategories} from './blog-data.js';
import {initGlobalNav} from './global-nav.js?v=20260729-arabic-nav1';

document.querySelector('#blog-app').innerHTML=`
  <header class="header"><a class="brand" href="/"><img src="/assets/trolinktek-logo.png" alt="TrolinkTek"></a><nav><a href="/products/">Products</a><a href="/#oem">OEM/ODM</a><a href="/#solutions">Solutions</a><a class="active" href="/blog/">Blog</a><a href="/about/">About</a></nav><a class="btn small" href="/#quote">Get a Quote</a><button class="menu" aria-label="Open menu">&#9776;</button></header>
  <main>
    <section class="blog-hero"><div class="crumb"><a href="/">Home</a><span>/</span><span>Blog</span></div><p class="section-label light">CarPlay knowledge center</p><h1>Insights for connected-car buyers.</h1><p>Compatibility guidance, sourcing frameworks and market insights for distributors, brands and OEM/ODM teams.</p></section>
    <nav class="blog-categories" aria-label="Blog categories">${blogCategories.map((category,index)=>`<button class="${index===0?'selected':''}" data-blog-category="${category}">${category}</button>`).join('')}</nav>
    <section class="blog-index"><div class="blog-index-head"><div><p class="section-label">Latest articles</p><h2>CarPlay adapter guides and market insights.</h2></div><p>Original TrolinkTek content structured around the questions buyers ask before product evaluation and RFQ.</p></div><div class="blog-grid" id="blog-grid"></div></section>
    <section class="blog-cta"><div><p class="section-label light">Need a product recommendation?</p><h2>Turn research into a shortlist.</h2><p>Share your market, target vehicle segment and customization requirements.</p></div><a class="btn" href="/#quote">Discuss Your Project</a></section>
  </main>
  <footer><div class="footer-brand"><img src="/assets/trolinktek-logo.png" alt="TrolinkTek"><p>Connected-drive products engineered for your market.</p></div><div><b>Blog topics</b>${blogCategories.slice(1,4).map(category=>`<a href="#" data-footer-category="${category}">${category}</a>`).join('')}</div><div><b>Products</b><a href="/products/">Product Center</a><a href="/downloads/">Downloads</a></div><div><b>Contact</b><a href="mailto:sales03@trolinkiot.com">sales03@trolinkiot.com</a></div><p class="copyright">Shenzhen TrolinkTek Technology Co., Ltd. &copy; All Rights Reserved.</p></footer>`;

const grid=document.querySelector('#blog-grid');
const render=category=>{
  const posts=category==='All posts'?blogPosts:blogPosts.filter(post=>post.category===category);
  grid.innerHTML=posts.map((post,index)=>`<article class="blog-card ${index===0&&category==='All posts'?'featured':''}"><div class="blog-card-image"><img src="${post.image}" alt="${post.title}"><span>${post.category}</span></div><div class="blog-card-copy"><div class="blog-meta"><time>${post.date}</time><span>${post.readTime}</span></div><h2>${post.title}</h2><p>${post.excerpt}</p><a href="/blog/${post.slug}/">Read article &rarr;</a></div></article>`).join('');
};
document.querySelectorAll('[data-blog-category]').forEach(button=>button.onclick=()=>{document.querySelectorAll('[data-blog-category]').forEach(item=>item.classList.toggle('selected',item===button));render(button.dataset.blogCategory)});
document.querySelectorAll('[data-footer-category]').forEach(link=>link.onclick=event=>{event.preventDefault();const button=document.querySelector(`[data-blog-category="${link.dataset.footerCategory}"]`);button.click();scrollTo({top:document.querySelector('.blog-categories').offsetTop-80,behavior:'smooth'})});
render('All posts');
initGlobalNav();
const header=document.querySelector('.header');document.querySelector('.menu').onclick=()=>header.classList.toggle('open');
