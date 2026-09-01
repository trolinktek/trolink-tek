import {initGlobalNav} from './global-nav.js?v=20260729-arabic-nav1';
import {blogPosts} from './blog-data.js';
import {connectInquiryForm} from './form-submit.js';
const products = [
  ['Wireless CarPlay Adapter','B15A &middot; Wireless CarPlay / Android Auto','Convert factory wired CarPlay to a fast, cable-free connection.','/assets/products/2670.jpg?v=20260806-logo-refresh1'],
  ['CarPlay AI Box','TAA01 &middot; Android platform','Bring apps and connected entertainment to compatible factory screens.','/assets/products/2517.jpg?v=20260806-logo-refresh1'],
  ['Smart Car Screen','CarPlay + Android Auto','Plug-and-play displays for cars that need a modern connected cockpit.','/assets/products/2524.jpg?v=20260806-logo-refresh1'],
  ['Motorcycle CarPlay','Built for the open road','Navigation, calls and audio in a rider-focused screen format.','/assets/motorcycle-carplay-white.png?v=20260806-logo-refresh1']
];

const steps = [
  ['01','Design','ID, structure and hardware','/assets/oem-process-design.webp'],
  ['02','Firmware','Features, UI and localization','/assets/oem-odm-engineering-hero-v2.png?v=20260803-2'],
  ['03','Branding','Logo and boot experience','/assets/oem-process-branding.webp'],
  ['04','Packaging','Retail-ready presentation','/assets/oem-process-packaging.webp'],
  ['05','Delivery','QC and ongoing support','/assets/oem-process-delivery.webp']
];
const banners = [
  ['/assets/home-company-strength-hero-light.png?v=20260901-tone-refresh1','TrolinkTek Shenzhen manufacturing facility, wireless engineering expertise and global production capacity'],
  ['/assets/carplay-dongle-exclusive-sales-banner.png?v=20260813-assets-reload2','TrolinkTek CarPlay dongles and wireless adapters for exclusive B2B sales'],
  ['/assets/banner-3in1-ai-box.png?v=20260813-assets-reload2','TrolinkTek 3 in 1 Android AI Box for CarPlay and Android Auto'],
  ['/assets/connected-drive-banner-v2.png?v=20260813-assets-reload2','Connected CarPlay experience with the new crystal wireless adapter'],
  ['/assets/motorcycle-carplay-banner.jpg?v=20260813-assets-reload2','Motorcycle smart navigation with CarPlay']
];
const certificates=[
  ['ISO 9001','/assets/certificates/iso-9001-web.jpg?v=20260827-1'],
  ['CE','/assets/certificates/ce-web.jpg?v=20260827-1'],
  ['FCC','/assets/certificates/fcc-web.jpg?v=20260827-1'],
  ['SRRC','/assets/certificates/srrc-web.jpg?v=20260827-1'],
  ['RoHS','/assets/certificates/rohs-web.jpg?v=20260827-1'],
  ['MiCOM Labs','/assets/certificates/micom-labs-web.jpg?v=20260827-1'],
  ['BCTC TEST','/assets/certificates/bctc-test-web.jpg?v=20260827-1']
];
const certificateCards=certificates.map(([name,image])=>`<article class="home-certificate-card"><div class="home-certificate-frame"><img src="${image}" alt="${name} certificate issued to TrolinkTek" loading="lazy"></div><h3>${name}</h3></article>`).join('');

document.querySelector('#app').innerHTML = `
<header class="header"><a class="brand" href="#top"><img src="/assets/trolinktek-logo.png" alt="TrolinkTek"></a><nav><a href="/products/">Products</a><a href="/oem-odm/">OEM/ODM</a><a href="/solutions/">Distributor</a><a href="/blog/">Blog</a><a href="/about/">About</a></nav><a class="btn small" href="#quote">Get a Quote</a><button class="menu" aria-label="Open menu">&#9776;</button></header>
<main id="top">
  <section class="hero" aria-label="TrolinkTek product banners"><h1 class="visually-hidden">Wireless CarPlay Adapter Manufacturer and Connected-Car OEM/ODM Partner</h1><div class="hero-media"><img id="hero-banner" src="${banners[0][0]}" alt="${banners[0][1]}"><button class="hero-arrow hero-prev" type="button" aria-label="Previous banner">&lsaquo;</button><button class="hero-arrow hero-next" type="button" aria-label="Next banner">&rsaquo;</button><div class="hero-dots" aria-label="Choose banner">${banners.map((_,index)=>`<button class="${index===0?'active':''}" type="button" data-slide="${index}" aria-label="Show banner ${index+1}"></button>`).join('')}</div></div></section>
  <section class="trust"><div><b>20+ years</b><span>Focused on wireless technology</span></div><div><b>OEM / ODM</b><span>Hardware, firmware and brand customization</span></div><div><b>Global supply</b><span>Built for distributors and automotive brands</span></div><div><b>Technical support</b><span>From evaluation through after-sales</span></div></section>
  <section class="section products" id="products"><div class="section-head"><div><p class="section-label">Product portfolio</p><h2>One factory. Four connected-drive categories.</h2></div><p>Start with a proven platform, then tailor the product, software and packaging to your market.</p></div><div class="product-grid">${products.map((p,i)=>`<article class="product"><div class="product-media"><img src="${p[3]}" alt="${p[0]} representative product" loading="lazy" width="500" height="500"><span>0${i+1}</span></div><p>${p[1]}</p><h3>${p[0]}</h3><div class="product-bottom"><span>${p[2]}</span><a href="#quote" aria-label="Ask about ${p[0]}">&rarr;</a></div></article>`).join('')}</div></section>
  <section class="oem" id="oem"><div class="oem-title"><p class="section-label light">OEM / ODM partnership</p><h2>From idea to shelf,<br>without the handoffs.</h2><p>One engineering and supply partner across the product lifecycle.</p><a class="btn" href="/oem-odm/">Explore OEM/ODM Solutions</a></div><div class="process">${steps.map(s=>`<div class="step"><span>${s[0]}</span><div class="step-media"><img src="${s[3]}" alt="${s[1]} stage of the TrolinkTek OEM and ODM process" loading="lazy"></div><h3>${s[1]}</h3><p>${s[2]}</p></div>`).join('')}</div></section>
  <section class="section solutions" id="solutions"><div class="section-head"><div><p class="section-label">Built around your sales model</p><h2>A clearer route to market.</h2></div><p>Commercial paths designed around the buyers named in your global keyword system.</p></div><div class="solution-list"><article><span>01</span><div><h3>Distributors & Importers</h3><p>Stable supply, localized portfolios, regional programs and scalable ordering.</p></div><a href="/solutions/#distributors">Discuss distribution &rarr;</a></article><article><span>02</span><div><h3>Brands & E-commerce Sellers</h3><p>Private label, custom packaging, firmware choices and retail-ready execution.</p></div><a href="/solutions/#brands">Build your brand &rarr;</a></article><article><span>03</span><div><h3>Installers & Auto Shops</h3><p>Compatible product choices, technical documentation and responsive support.</p></div><a href="/solutions/#installers">Find your solution &rarr;</a></article></div></section>
  <section class="home-certificates" id="about"><div class="home-certificate-copy"><p class="section-label light">Compliance &amp; quality</p><h2>Certificates supporting global programs.</h2><p>Review quality-management and product-compliance documentation for supplier qualification and connected-car programs.</p><a class="btn" href="/about/#certificates">View All Certificates</a></div><div class="home-certificate-marquee" aria-label="TrolinkTek certificate carousel"><div class="home-certificate-track"><div class="home-certificate-group">${certificateCards}</div><div class="home-certificate-group" aria-hidden="true">${certificateCards}</div></div></div></section>
  <section class="factory" id="factory"><img src="/assets/showroom.jpg" alt="TrolinkTek Shenzhen showroom and reception"><div class="factory-panel"><p class="section-label light">Shenzhen manufacturing partner</p><h2>Proof you can inspect.</h2><div class="facts"><div><b>4,000 m&sup2;</b><span>factory area*</span></div><div><b>55 million</b><span>units annual capacity*</span></div></div><p>* Company-stated figures from the supplied 2026 company materials. Confirm current capacity during supplier qualification.</p><a class="btn" href="#quote">Request Factory Profile</a></div></section>
  <section class="section resources" id="blog"><div class="section-head"><div><p class="section-label">Latest from the blog</p><h2>CarPlay insights for better buying decisions.</h2></div><p>Compatibility guidance, sourcing frameworks and market knowledge for distributors, brands and OEM/ODM teams.</p></div><div class="resource-grid">${blogPosts.slice(0,3).map(post=>`<article><span>${post.category} &middot; ${post.date}</span><h3>${post.title}</h3><p>${post.excerpt}</p><a href="/blog/${post.slug}/">Read the article &rarr;</a></article>`).join('')}</div><div class="blog-all-link"><a class="btn dark" href="/blog/">View All Blog Posts</a></div></section>
  <section class="quote" id="quote"><div><p class="section-label light">Start a project</p><h2>Tell us what you want to bring to market.</h2><p>Share your product category, target market and customization needs. Our team will follow up with the right next step.</p></div><form id="rfq"><label>Name<input required name="name" placeholder="Your name"></label><label>Work email<input required type="email" name="email" placeholder="name@company.com"></label><label>Company<input name="company" placeholder="Company name"></label><label>Interested in<select name="interest"><option>Wireless CarPlay Adapters</option><option>CarPlay AI Boxes</option><option>Smart Car Screens</option><option>Motorcycle CarPlay</option><option>OEM / ODM project</option></select></label><label class="full">Project details<textarea name="message" placeholder="Target market, estimated volume and customization needs"></textarea></label><button class="btn full" type="submit">Send Project Brief</button><p class="form-status" role="status"></p></form></section>
</main>
<footer><div class="footer-brand"><img src="/assets/trolinktek-logo.png" alt="TrolinkTek"><p>Connected-drive products engineered for your market.</p></div><div><b>Products</b><a href="#products">CarPlay Adapters</a><a href="#products">AI Boxes</a><a href="#products">Smart Screens</a><a href="#products">Motorcycle CarPlay</a></div><div><b>Partnership</b><a href="/oem-odm/">OEM/ODM</a><a href="/solutions/">Distributors</a><a href="#factory">Factory Profile</a><a href="#quote">Contact</a></div><div><b>Blog</b><a href="/blog/">Buying Guides</a><a href="/blog/">Technical Articles</a><a href="/blog/">Compatibility</a></div><p class="copyright">Shenzhen TrolinkTek Technology Co., Ltd. &copy; All Rights Reserved.</p></footer>`;

initGlobalNav();
const header = document.querySelector('.header');
document.querySelector('.menu').addEventListener('click',()=>header.classList.toggle('open'));
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>header.classList.remove('open')));
const heroBanner=document.querySelector('#hero-banner');
const heroDots=[...document.querySelectorAll('[data-slide]')];
let currentBanner=0;
const showBanner=index=>{
  currentBanner=(index+banners.length)%banners.length;
  heroBanner.classList.add('changing');
  window.setTimeout(()=>{
    heroBanner.src=banners[currentBanner][0];
    heroBanner.alt=banners[currentBanner][1];
    heroDots.forEach((dot,dotIndex)=>dot.classList.toggle('active',dotIndex===currentBanner));
    heroBanner.classList.remove('changing');
  },140);
};
document.querySelector('.hero-prev').addEventListener('click',()=>showBanner(currentBanner-1));
document.querySelector('.hero-next').addEventListener('click',()=>showBanner(currentBanner+1));
heroDots.forEach(dot=>dot.addEventListener('click',()=>showBanner(Number(dot.dataset.slide))));
window.setInterval(()=>showBanner(currentBanner+1),6000);
connectInquiryForm(document.querySelector('#rfq'),'Homepage contact form');
