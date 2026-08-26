import {manuals,languagesFor,imageUrl,downloadUrl} from './downloads-data.js?v=20260803-b71-refresh1';
import {initGlobalNav} from './global-nav.js?v=20260803-b71-refresh1';

const slug=location.pathname.split('/').filter(Boolean).pop();
const manual=manuals.find(item=>item.slug===slug)||manuals[0];
const languages=languagesFor(manual);
const app=document.querySelector('#manual-app');

document.title=`${manual.title} | TrolinkTek Downloads`;
let description=document.head.querySelector('meta[name="description"]');
if(!description){description=document.createElement('meta');description.name='description';document.head.appendChild(description)}
description.content=`${manual.summary} View available language versions and download the official TrolinkTek manual.`;
let canonical=document.head.querySelector('link[rel="canonical"]');
if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.appendChild(canonical)}
canonical.href=`https://www.trolinktek.com/downloads/${manual.slug}/`;
app.innerHTML=`
  <header class="header">
    <a class="brand" href="/"><img src="/assets/trolinktek-logo.png" alt="TrolinkTek"></a>
    <nav><a href="/products/">Products</a><a href="/#oem">OEM/ODM</a><a href="/#solutions">Solutions</a><a href="/blog/">Blog</a><a href="/about/">About</a></nav>
    <a class="btn small" href="/downloads/">All Downloads</a>
    <button class="menu" aria-label="Open menu">&#9776;</button>
  </header>
  <main>
    <section class="manual-hero">
      <div class="crumb"><a href="/">Home</a><span>/</span><a href="/downloads/">Downloads</a><span>/</span><span>${manual.title}</span></div>
      <h1>${manual.title}</h1><p>${manual.summary}</p>
    </section>
${manual.files?`
      <section class="manual-viewer">
        <aside>
          <p class="section-label">Language</p><h2>Select your manual.</h2>
          <div class="language-list">${languages.map((language,index)=>`<button class="${index===0?'selected':''}" data-lang="${language[0]}">${language[1]}<span>&rarr;</span></button>`).join('')}</div>
          <button class="btn download-current">Download current manual</button>
          <a class="source-link" href="${manual.source}" target="_blank" rel="noreferrer">View original source &rarr;</a>
        </aside>
        <div class="manual-canvas">
          <div class="manual-status"><b id="manual-language">${languages[0][1]}</b><span>Official image manual &middot; Source: trolinktek.com</span></div>
          <img id="manual-image" src="${imageUrl(manual,languages[0][0])}" alt="${manual.title} in ${languages[0][1]}">
          <p class="image-error" hidden>This language image is not currently available.</p>
        </div>
      </section>`:`
      <section class="manual-pending"><div><p class="section-label">Source status</p><h2>The source page does not currently publish a manual file.</h2><p>We verified the current TrolinkTek page for ${manual.title}. No visible manual image or downloadable document is available there yet.</p><div class="actions"><a class="btn" href="mailto:sales03@trolinkiot.com?subject=${encodeURIComponent(manual.title)}">Request this manual</a><a class="text-link" href="${manual.source}" target="_blank" rel="noreferrer">Check source page &rarr;</a></div></div></section>`}
    <section class="manual-help"><div><p class="section-label light">Before installation</p><h2>Confirm the exact product model.</h2><p>Product appearance and functions can vary by model or firmware version. Match the model label before following any installation steps.</p></div><a class="btn" href="/downloads/">Browse All Manuals</a></section>
  </main>
  <footer>
    <div class="footer-brand"><img src="/assets/trolinktek-logo.png" alt="TrolinkTek"><p>Connected-drive products and multilingual support.</p></div>
    <div><b>Downloads</b><a href="/downloads/">All Manuals</a><a href="${manual.source}" target="_blank" rel="noreferrer">Original Source</a></div>
    <div><b>Support</b><a href="mailto:sales03@trolinkiot.com">Email Support</a><a href="tel:+8618665350398">+86 186 6535 0398</a></div>
    <div><b>Products</b><a href="/products/">Product Center</a><a href="/products/wireless-carplay-adapters/">CarPlay Adapters</a></div>
    <p class="copyright">Shenzhen TrolinkTek Technology Co., Ltd. &copy; All Rights Reserved.</p>
  </footer>`;

initGlobalNav();
const header=document.querySelector('.header');
document.querySelector('.menu').onclick=()=>header.classList.toggle('open');

if(manual.files){
  const image=document.querySelector('#manual-image');
  const error=document.querySelector('.image-error');
  document.querySelectorAll('[data-lang]').forEach(button=>{
    button.onclick=()=>{
      document.querySelectorAll('[data-lang]').forEach(item=>item.classList.toggle('selected',item===button));
      const language=languages.find(item=>item[0]===button.dataset.lang);
      document.querySelector('#manual-language').textContent=language[1];
      error.hidden=true;
      image.hidden=false;
      image.src=imageUrl(manual,language[0]);
      image.alt=`${manual.title} in ${language[1]}`;
    };
  });
  image.onerror=()=>{image.hidden=true;error.hidden=false};
  document.querySelector('.download-current').onclick=()=>{
    const lang=document.querySelector('[data-lang].selected').dataset.lang;
    const anchor=document.createElement('a');
    anchor.href=downloadUrl(manual,lang);
    anchor.download=`${manual.slug}-${lang}.png`;
    anchor.click();
  };
}
