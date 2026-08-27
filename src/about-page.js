import {initGlobalNav} from './global-nav.js?v=20260729-arabic-nav1';

const exhibitions=[
  {name:'Connected-car showcase',image:'/assets/exhibitions/trolinktek-exhibition-team-booth-web.jpg?v=20260827-1',alt:'TrolinkTek exhibition team at a connected-car product booth',description:'Our team presents wireless CarPlay adapters, AI boxes and display platforms to visiting buyers and channel partners.'},
  {name:'Live product demonstration',image:'/assets/exhibitions/trolinktek-exhibition-product-demo-web.jpg?v=20260827-1',alt:'TrolinkTek team demonstrating an electronics platform to exhibition visitors',description:'Face-to-face demonstrations help buyers review platform functions, hardware options and potential application routes.'},
  {name:'International partner meeting',image:'/assets/exhibitions/trolinktek-exhibition-partner-meeting-web.jpg?v=20260827-1',alt:'TrolinkTek representative meeting an international buyer at a trade show',description:'Exhibitions create a practical setting to discuss target markets, customization requirements and OEM or ODM project scope.'},
  {name:'Distributor engagement',image:'/assets/exhibitions/trolinktek-exhibition-customer-engagement-web.jpg?v=20260827-1',alt:'TrolinkTek exhibition team with an international visitor',description:'In-person conversations help our team understand regional demand, sales channels and after-sales expectations.'},
  {name:'Regional CarPlay showcase',image:'/assets/exhibitions/trolinktek-exhibition-carplay-booth-web.jpg?v=20260827-1',alt:'TrolinkTek team at a regional CarPlay product exhibition booth',description:'Product-focused exhibition displays give buyers a direct view of available platforms, form factors and connected-car applications.'}
];
const twoDigits=value=>value<10?`0${value}`:String(value);
const factoryImages=[
  {src:'/assets/trolinktek-real-smt-production-line.jpg?v=20260803-1',alt:'TrolinkTek SMT production floor with automated equipment and technicians'},
  {src:'/assets/factory/factory-smt-line-01.webp?v=20260814-1',alt:'TrolinkTek clean SMT workshop with reflow equipment and production staff'},
  {src:'/assets/factory/factory-smt-line-02.webp?v=20260814-1',alt:'TrolinkTek SMT production line with operators and quality-control workstations'},
  {src:'/assets/factory/factory-reflow-oven.webp?v=20260814-1',alt:'Reflow oven operating in the TrolinkTek electronics production workshop'},
  {src:'/assets/factory/factory-smt-line-03.webp?v=20260814-1',alt:'Automated SMT placement equipment across the TrolinkTek production floor'},
  {src:'/assets/factory/factory-placement-workshop.webp?v=20260814-1',alt:'TrolinkTek component placement workshop with monitored production stations'},
  {src:'/assets/factory/factory-engineering-test.webp?v=20260814-1',alt:'TrolinkTek engineers testing electronic assemblies at factory workbenches'},
  {src:'/assets/factory/factory-automation-equipment.webp?v=20260814-1',alt:'Automated electronics production equipment at the TrolinkTek Shenzhen facility'},
  {src:'/assets/factory/factory-workshop-panorama-01.webp?v=20260817-panorama1',alt:'Panoramic view of TrolinkTek assembly, inspection and packing workstations',display:'panorama'}
];

document.querySelector('#about-app').innerHTML=`
<header class="header"><a class="brand" href="/"><img src="/assets/trolinktek-logo.png" alt="TrolinkTek"></a><nav><a href="/products/">Products</a><a href="/#oem">OEM/ODM</a><a href="/#solutions">Solutions</a><a href="/blog/">Blog</a><a class="active" href="/about/">About</a></nav><a class="btn small" href="/#quote">Get a Quote</a><button class="menu" aria-label="Open menu">&#9776;</button></header>
<main>
  <section class="about-hero" id="company"><div class="about-hero-copy"><div class="crumb"><a href="/">Home</a><span>/</span><span>About</span></div><h1>Connected mobility, engineered as one complete system.</h1><p>TrolinkTek brings product development, firmware, customization, supply and support together for automotive brands and distributors worldwide.</p><a class="btn" href="/#quote">Start a Conversation</a></div><div class="about-hero-image"><img src="/assets/trolinktek-global-partnership-team.png" alt="TrolinkTek team welcoming international business partners at the Shenzhen office"></div></section>
  <section class="about-belief"><blockquote>&ldquo;A good connected-car product is not only hardware. It is the product, firmware, supply and support working as one.&rdquo;</blockquote><p>That belief shapes how we develop wireless CarPlay, Android Auto and connected-drive products&mdash;from platform evaluation to long-term after-sales support.</p></section>
  <section class="about-certificates about-exhibitions" id="exhibitions"><div class="certificate-copy"><span>Global exhibitions</span><h2>Meeting partners across global markets.</h2><p>From live product demonstrations to distributor discussions, our exhibition record shows how TrolinkTek presents connected-car platforms, gathers market feedback and supports international buyers.</p><div class="certificate-meta" aria-live="polite"><strong id="certificate-name">${exhibitions[0].name}</strong><span id="certificate-count">01 / ${twoDigits(exhibitions.length)}</span></div><div class="certificate-controls"><button class="certificate-prev" type="button" aria-label="Previous exhibition photo">&larr;</button><button class="certificate-next" type="button" aria-label="Next exhibition photo">&rarr;</button></div><a class="text-link" href="/#quote">Plan a meeting with our team &rarr;</a></div><div class="certificate-stage" aria-roledescription="carousel" aria-label="TrolinkTek exhibition history"><div class="certificate-frame"><img id="certificate-image" src="${exhibitions[0].image}" alt="${exhibitions[0].alt}" loading="lazy" width="1920" height="1440"></div><p id="certificate-description">${exhibitions[0].description}</p><div class="certificate-dots" role="tablist" aria-label="Choose an exhibition photo">${exhibitions.map((exhibition,index)=>`<button type="button" role="tab" aria-label="Show ${exhibition.name}" aria-selected="${index===0}" data-certificate-index="${index}"></button>`).join('')}</div></div></section>
  <section class="about-capabilities" id="factory"><div class="capability-media" aria-roledescription="carousel" aria-label="TrolinkTek Shenzhen factory"><img id="factory-image" src="${factoryImages[0].src}" alt="${factoryImages[0].alt}" loading="lazy" width="1920" height="1440"><div class="factory-carousel-controls"><button class="factory-prev" type="button" aria-label="Show previous factory photo">&larr;</button><button class="factory-next" type="button" aria-label="Show next factory photo">&rarr;</button></div><div class="factory-carousel-status" aria-live="polite"><span id="factory-count">01 / ${twoDigits(factoryImages.length)}</span><div class="factory-carousel-dots" role="tablist" aria-label="Choose a factory photo">${factoryImages.map((image,index)=>`<button type="button" role="tab" aria-label="Show factory photo ${index+1}" aria-selected="${index===0}" data-factory-index="${index}"></button>`).join('')}</div></div></div><div class="capability-copy"><span>Shenzhen manufacturing partner</span><h2>Proof you can inspect.</h2><p>Our Shenzhen operation connects engineering, product evaluation and global commercial support. Visit the facility to review products, workflows and the people behind your program.</p><dl><div><dt>4,000 m&sup2;</dt><dd>Company-stated factory area*</dd></div><div><dt>55 million</dt><dd>Company-stated annual unit capacity*</dd></div><div><dt>20+ years</dt><dd>Focus on automotive and wireless connectivity</dd></div></dl><small>* Figures are based on supplied 2026 company materials and should be confirmed during supplier qualification.</small><a class="btn dark" href="/#quote">Request Factory Profile</a></div></section>
  <section class="about-team" id="team"><div class="team-copy"><span>People behind the products</span><h2>A team built for long-term partnerships.</h2><p>Engineering knowledge matters, but so do response time, accountability and continuity. Our team supports product evaluation, customization, documentation, delivery and after-sales coordination for customers across global markets.</p></div><img src="/assets/trolinktek-18th-anniversary-team.jpg" alt="TrolinkTek team celebrating the company&rsquo;s 18th anniversary"></section>
  <section class="about-location" id="location"><div class="location-copy"><span>Shenzhen office</span><h2>Visit TrolinkTek.</h2><p>Floors 4 to 7, Building 5, Phase II, Donghua International Manufacturing Park, Sanwei Community, Hangcheng Sub-district, Bao'an District, Shenzhen, Guangdong, China</p><dl><div><dt>Email</dt><dd><a href="mailto:sales03@trolinkiot.com">sales03@trolinkiot.com</a></dd></div></dl><a class="btn dark" href="https://www.google.com/maps?hl=en&amp;q=22.6097778,113.8407222" target="_blank" rel="noreferrer">Open in Google Maps &rarr;</a></div><div class="location-map"><iframe title="TrolinkTek location on Google Maps" src="https://www.google.com/maps?hl=en&amp;q=22.6097778,113.8407222&amp;z=16&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div></section>
  <section class="about-visit"><div><h2>Evaluate TrolinkTek for your next connected-car program.</h2><p>Share your target market, product category and customization requirements with our team.</p></div><a class="btn" href="/#quote">Discuss Your Project</a></section>
</main>
<footer><div class="footer-brand"><img src="/assets/trolinktek-logo.png" alt="TrolinkTek"><p>Connected-drive products engineered for your market.</p></div><div><b>About</b><a href="#exhibitions">Exhibitions</a><a href="#factory">Factory</a><a href="#team">Team</a></div><div><b>Explore</b><a href="/products/">Products</a><a href="/blog/">Blog</a><a href="/downloads/">Downloads</a></div><div><b>Contact</b><a href="mailto:sales03@trolinkiot.com">sales03@trolinkiot.com</a><a href="tel:+8618665350398">+86 186 6535 0398</a></div><p class="copyright">Shenzhen TrolinkTek Technology Co., Ltd. &copy; All Rights Reserved.</p></footer>`;

initGlobalNav();
const header=document.querySelector('.header');
document.querySelector('.menu').onclick=()=>header.classList.toggle('open');

const certificateImage=document.querySelector('#certificate-image');
const certificateName=document.querySelector('#certificate-name');
const certificateCount=document.querySelector('#certificate-count');
const certificateDescription=document.querySelector('#certificate-description');
const certificateDots=[...document.querySelectorAll('[data-certificate-index]')];
const certificateStage=document.querySelector('.certificate-stage');
let certificateIndex=0;
let certificateTimer;

function showCertificate(index){
  certificateIndex=(index+exhibitions.length)%exhibitions.length;
  const certificate=exhibitions[certificateIndex];
  certificateImage.classList.add('is-changing');
  window.setTimeout(()=>{
    certificateImage.src=certificate.image;
    certificateImage.alt=certificate.alt;
    certificateName.textContent=certificate.name;
    certificateCount.textContent=`${twoDigits(certificateIndex+1)} / ${twoDigits(exhibitions.length)}`;
    certificateDescription.textContent=certificate.description;
    certificateDots.forEach((dot,dotIndex)=>dot.setAttribute('aria-selected',String(dotIndex===certificateIndex)));
    certificateImage.classList.remove('is-changing');
  },140);
}

function startCertificateAutoplay(){
  window.clearInterval(certificateTimer);
  certificateTimer=window.setInterval(()=>showCertificate(certificateIndex+1),6000);
}

document.querySelector('.certificate-prev').addEventListener('click',()=>{showCertificate(certificateIndex-1);startCertificateAutoplay()});
document.querySelector('.certificate-next').addEventListener('click',()=>{showCertificate(certificateIndex+1);startCertificateAutoplay()});
certificateDots.forEach(dot=>dot.addEventListener('click',()=>{showCertificate(Number(dot.dataset.certificateIndex));startCertificateAutoplay()}));
certificateStage.addEventListener('mouseenter',()=>window.clearInterval(certificateTimer));
certificateStage.addEventListener('mouseleave',startCertificateAutoplay);
startCertificateAutoplay();

const factoryImage=document.querySelector('#factory-image');
const factoryMedia=document.querySelector('.capability-media');
const factoryCount=document.querySelector('#factory-count');
const factoryDots=[...document.querySelectorAll('[data-factory-index]')];
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let factoryIndex=0;
let factoryTimer;

function showFactoryImage(index){
  factoryIndex=(index+factoryImages.length)%factoryImages.length;
  const image=factoryImages[factoryIndex];
  factoryImage.classList.add('is-changing');
  window.setTimeout(()=>{
    factoryImage.src=image.src;
    factoryImage.alt=image.alt;
    factoryImage.classList.toggle('is-panorama',image.display==='panorama');
    factoryMedia.classList.toggle('has-panorama',image.display==='panorama');
    factoryMedia.style.setProperty('--factory-panorama',image.display==='panorama'?`url("${image.src}")`:'none');
    factoryCount.textContent=`${twoDigits(factoryIndex+1)} / ${twoDigits(factoryImages.length)}`;
    factoryDots.forEach((dot,dotIndex)=>dot.setAttribute('aria-selected',String(dotIndex===factoryIndex)));
    factoryImage.classList.remove('is-changing');
  },reduceMotion?0:180);
}

function startFactoryAutoplay(){
  window.clearInterval(factoryTimer);
  if(!reduceMotion) factoryTimer=window.setInterval(()=>showFactoryImage(factoryIndex+1),5200);
}

document.querySelector('.factory-prev').addEventListener('click',()=>{showFactoryImage(factoryIndex-1);startFactoryAutoplay()});
document.querySelector('.factory-next').addEventListener('click',()=>{showFactoryImage(factoryIndex+1);startFactoryAutoplay()});
factoryDots.forEach(dot=>dot.addEventListener('click',()=>{showFactoryImage(Number(dot.dataset.factoryIndex));startFactoryAutoplay()}));
factoryMedia.addEventListener('mouseenter',()=>window.clearInterval(factoryTimer));
factoryMedia.addEventListener('mouseleave',startFactoryAutoplay);
factoryMedia.addEventListener('focusin',()=>window.clearInterval(factoryTimer));
factoryMedia.addEventListener('focusout',startFactoryAutoplay);
document.addEventListener('visibilitychange',()=>document.hidden?window.clearInterval(factoryTimer):startFactoryAutoplay());
startFactoryAutoplay();

const preloadFactoryImages=()=>factoryImages.slice(1).forEach(image=>{const preload=new Image();preload.src=image.src});
if('requestIdleCallback' in window) window.requestIdleCallback(preloadFactoryImages,{timeout:2500});
else window.setTimeout(preloadFactoryImages,1200);
