import {manuals} from './downloads-data.js?v=20260803-b71-refresh1';
import {connectInquiryForm} from './form-submit.js';
import {initMultilingualSite} from './multilingual.js?v=20260729-arabic-nav1';

export function initGlobalNav(){
  installNavStyles();
  syncFooterContact();
  if(location.pathname==='/downloads/'&&!document.querySelector('.downloads-hero h1')){
    document.querySelector('.downloads-hero')?.insertAdjacentHTML('afterbegin','<h1 class="visually-hidden">TrolinkTek CarPlay Adapter Manuals and Downloads</h1>');
  }
  const nav=document.querySelector('.header nav');
  if(!nav)return;

  const solutionsLink=[...nav.children].find(link=>['Solutions','Distributor'].includes(link.textContent.trim()));
  if(solutionsLink){
    solutionsLink.textContent='Distributor';
    solutionsLink.href='/solutions/';
  }
  const oemLink=[...nav.children].find(link=>link.textContent.trim()==='OEM/ODM');
  if(oemLink)oemLink.href='/oem-odm/';

  const legacyResources=[...nav.children].find(link=>link.textContent.trim()==='Resources');
  if(legacyResources){legacyResources.textContent='Blog';legacyResources.href='/blog/'}

  const aboutLink=[...nav.children].find(link=>link.textContent.trim()==='About');
  if(!nav.querySelector('.downloads-nav'))nav.insertBefore(createDownloadsMenu(),aboutLink||null);
  if(!nav.querySelector('.about-nav')){
    const currentAbout=[...nav.children].find(link=>link.textContent.trim()==='About');
    nav.insertBefore(createAboutMenu(),currentAbout||null);
    currentAbout?.remove();
  }
  initQuoteModal();
  initMultilingualSite();
}

function syncFooterContact(){
  const brand=document.querySelector('footer .footer-brand');
  if(!brand)return;
  brand.classList.add('notranslate');
  const existing=brand.querySelector('p');
  const contact=document.createElement('div');
  contact.className='footer-contact-details';
  contact.innerHTML=`
    <a class="footer-contact-row" href="tel:+8618665350398" aria-label="Call TrolinkTek">
      <span class="footer-contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7.2 3.5 9.4 8l-2.1 1.7a15 15 0 0 0 7 7l1.7-2.1 4.5 2.2-.8 3.2c-.2.8-.9 1.3-1.7 1.3C9.6 21.3 2.7 14.4 2.7 6c0-.8.5-1.5 1.3-1.7l3.2-.8Z"/></svg></span>
      <span>+86-18665350398</span>
    </a>
    <a class="footer-contact-row footer-whatsapp-row" href="https://wa.me/8618665350398" target="_blank" rel="noreferrer" aria-label="Contact TrolinkTek on WhatsApp">
      <span class="footer-contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20.2 11.7a8.2 8.2 0 0 1-12 7.2L4 20l1.1-4A8.2 8.2 0 1 1 20.2 11.7Z"/><path d="M9 8.2c.5 3 2.4 4.9 5.5 5.6l1-1.2 2.1 1c-.5 1.8-1.7 2.6-3.5 2.3-3.9-.7-6.5-3.2-7.2-7.1-.2-1.3.5-2.2 1.7-2.6l1.1 2-0.7 1Z"/></svg></span>
      <span>+86-18665350398</span>
    </a>
    <a class="footer-contact-row" href="mailto:sales03@trolinkiot.com">
      <span class="footer-contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3.5 6h17v12h-17V6Z"/><path d="m4 7 8 6 8-6"/></svg></span><span>sales03@trolinkiot.com</span>
    </a>`;
  existing?.replaceWith(contact);
}

function installNavStyles(){
  if(document.querySelector('#global-mega-nav-style'))return;
  const style=document.createElement('style');
  style.id='global-mega-nav-style';
  style.textContent=`
    .header nav{align-items:center}.downloads-nav,.about-nav{position:relative;display:flex;align-items:center;gap:4px}
    .downloads-nav>a,.about-nav>a{display:inline-flex;align-items:center;min-height:76px}
    .downloads-nav>button,.about-nav>button{border:0;background:none;color:#fff;padding:5px;font-size:13px;cursor:pointer;transition:transform .2s}
    .downloads-nav.open>button,.about-nav.open>button{transform:rotate(180deg)}
    .downloads-menu,.about-menu{display:none;position:fixed;z-index:30;top:76px;left:50%;width:min(1120px,calc(100vw - 40px));transform:translateX(-50%);background:#fff;color:#0a1830;box-shadow:0 24px 70px rgba(0,16,38,.28);border:1px solid #dce3ec;border-top:3px solid #0869ff}
    .downloads-menu{grid-template-columns:280px minmax(420px,1fr) 290px}.about-menu{grid-template-columns:1.05fr .95fr .9fr}
    .downloads-nav:hover .downloads-menu,.downloads-nav.open .downloads-menu,.about-nav:hover .about-menu,.about-nav.open .about-menu{display:grid}
    .mega-intro,.mega-manuals,.mega-feature{min-width:0;overflow:hidden}.mega-intro,.mega-feature,.about-menu section{padding:30px}.mega-intro,.about-story{background:#06172d;color:#fff}
    .mega-eyebrow{display:block;margin-bottom:18px;color:#6ca6ff;font-size:10px;font-weight:800;letter-spacing:.16em;text-transform:uppercase}
    .mega-intro h2,.about-story h2{margin:0 0 14px;font-size:25px;line-height:1.15;letter-spacing:-.035em;white-space:normal;overflow-wrap:break-word;word-break:normal}
    .mega-intro h2{max-width:220px}
    .mega-intro p,.mega-feature p,.about-story p,.about-menu p{margin:0;color:#9fb0c7;font-size:11px;line-height:1.65;white-space:normal;overflow-wrap:break-word}
    .mega-primary{display:inline-flex;margin-top:26px;color:#fff;font-size:12px;font-weight:800}.mega-manuals{padding:30px;border-right:1px solid #dce3ec}
    .mega-section-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:17px}.mega-section-head b{font-size:13px}.mega-section-head a{color:#0869ff;font-size:10px;font-weight:800}
    .mega-links{display:grid;grid-template-columns:1fr 1fr;gap:0 22px}.mega-links a{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:13px 0;border-bottom:1px solid #dce3ec;font-size:11px;font-weight:650;line-height:1.35}.mega-links a::after{content:'\\2192';color:#0869ff;font-size:14px}.mega-links a:hover{color:#0869ff}
    .mega-feature,.about-proof{background:#f4f7fb}.mega-feature-image{height:112px;margin:0 0 18px;overflow:hidden;background:#fff;border:1px solid #dce3ec}.mega-feature-image img{width:100%;height:100%;object-fit:cover;object-position:top}.mega-feature h3{margin:0 0 8px;font-size:20px}.mega-feature p{max-width:100%;font-size:10px;line-height:1.55}.mega-badges{display:flex;gap:6px;margin:14px 0}.mega-badges span{padding:5px 7px;background:#fff;border:1px solid #dce3ec;color:#627086;font-size:9px;font-weight:800}.mega-feature>a{display:inline-flex;color:#0869ff;font-size:11px;font-weight:800;white-space:normal}.mega-support{margin-top:20px;padding-top:16px;border-top:1px solid #dce3ec}.mega-support a{display:block;margin-top:7px;color:#0a1830;font-size:10px;overflow-wrap:anywhere}
    .about-story a{display:inline-flex;margin-top:24px;color:#fff;font-size:12px;font-weight:800}.about-links{display:grid;align-content:start}.about-links h3,.about-proof h3{margin:0 0 18px;font-size:17px}.about-links a{display:grid;grid-template-columns:32px 1fr;gap:12px;padding:13px 0;border-bottom:1px solid #dce3ec;font-size:12px;font-weight:750}.about-links a span{color:#0869ff;font-size:10px}.about-proof img{width:100%;height:112px;object-fit:cover;margin-bottom:16px}.about-proof b{display:block;margin-bottom:7px;font-size:13px}.about-proof a{display:inline-flex;margin-top:18px;color:#0869ff;font-size:11px;font-weight:800}
    .quote-modal{position:fixed;inset:0;z-index:100;display:none;place-items:center;padding:24px;background:rgba(3,14,28,.78);backdrop-filter:blur(6px)}.quote-modal.open{display:grid}.quote-dialog{position:relative;width:min(760px,100%);max-height:calc(100vh - 48px);overflow:auto;background:#fff;color:#0a1830;padding:42px;box-shadow:0 28px 90px rgba(0,0,0,.35)}.quote-dialog>button{position:absolute;right:18px;top:14px;border:0;background:none;color:#0a1830;font-size:28px;cursor:pointer}.quote-dialog h2{margin:0 0 12px;font-size:38px;letter-spacing:-.04em}.quote-dialog>p{margin:0 0 28px;color:#627086;line-height:1.6}.quote-dialog form{padding:0}.quote-dialog .form-status{margin-top:4px}
    .language-nav{position:relative;z-index:35;direction:ltr}.language-trigger{min-width:64px;height:40px;display:flex;align-items:center;justify-content:center;gap:7px;padding:0 10px;border:1px solid rgba(255,255,255,.28);border-radius:5px;background:rgba(255,255,255,.06);color:#fff;font:700 11px/1 Manrope;cursor:pointer}.language-trigger span{color:#6ca6ff;font-size:17px}.language-trigger i{font-style:normal;font-size:10px;transition:transform .2s}.language-nav.open .language-trigger i{transform:rotate(180deg)}.language-trigger:hover,.language-trigger:focus-visible{border-color:#6ca6ff;background:rgba(8,105,255,.15);outline:none}.language-menu{display:none;position:absolute;top:calc(100% + 10px);right:0;width:190px;padding:8px;background:#fff;color:#0a1830;border:1px solid #dce3ec;border-top:3px solid #0869ff;box-shadow:0 20px 55px rgba(0,16,38,.25)}.language-nav.open .language-menu{display:grid}.language-menu button{display:flex;align-items:center;justify-content:space-between;width:100%;min-height:40px;padding:0 12px;border:0;border-bottom:1px solid #e8edf4;background:#fff;color:#0a1830;font:650 12px/1.2 Manrope;text-align:left;cursor:pointer}.language-menu button:last-child{border-bottom:0}.language-menu button:hover,.language-menu button:focus-visible,.language-menu button[aria-checked="true"]{background:#eef5ff;color:#0869ff;outline:none}.language-menu small{color:#7c899b;font-size:9px;font-weight:800}.goog-te-banner-frame.skiptranslate,.goog-te-banner-frame,iframe.goog-te-banner-frame,body>iframe.skiptranslate{display:none!important}html,body{top:0!important;margin-top:0!important}#google_translate_element{position:fixed!important;left:-9999px!important;bottom:-9999px!important;width:1px!important;height:1px!important;overflow:hidden!important;opacity:0!important;pointer-events:none!important}
    html[dir="rtl"] body{text-align:right}html[dir="rtl"] .header,html[dir="rtl"] .header nav{direction:ltr}html[dir="rtl"] .actions,html[dir="rtl"] .card-links{direction:rtl}html[dir="rtl"] .language-nav{direction:ltr}html[dir="rtl"] input,html[dir="rtl"] select,html[dir="rtl"] textarea{direction:rtl}html[dir="rtl"] .language-menu{right:0;left:auto}html[dir="rtl"] .language-menu button span{direction:rtl;text-align:right}html[dir="rtl"] .quote-dialog>button{right:auto;left:18px}
    @media(max-width:1100px){
      .header.open nav{align-items:stretch}.header.open .downloads-nav,.header.open .about-nav{display:grid;grid-template-columns:1fr auto;width:100%}.header.open .downloads-nav>a,.header.open .about-nav>a{min-height:0}
      .header.open .downloads-menu,.header.open .about-menu{position:static;grid-column:1/-1;width:100%;max-height:62vh;overflow:auto;transform:none;grid-template-columns:1fr;box-shadow:none;margin-top:10px;border-top-width:2px}
      .header.open .downloads-nav:not(.open) .downloads-menu,.header.open .about-nav:not(.open) .about-menu{display:none}.header.open .downloads-nav:hover:not(.open) .downloads-menu,.header.open .about-nav:hover:not(.open) .about-menu{display:none}
      .mega-intro,.mega-feature,.mega-manuals,.about-menu section{padding:22px}.mega-manuals{border-right:0}.mega-links{grid-template-columns:1fr}.mega-feature-image,.about-proof img{display:none}.quote-dialog{padding:34px 22px}.quote-dialog h2{font-size:32px}
      .language-nav{margin-left:auto}.language-menu{position:fixed;top:68px;right:16px;left:auto;width:min(260px,calc(100vw - 32px));max-height:calc(100vh - 92px);overflow:auto}
    }`;
  document.head.appendChild(style);
}

function wireMenu(group){
  const button=group.querySelector('button');
  const close=()=>{group.classList.remove('open');button.setAttribute('aria-expanded','false')};
  button.onclick=event=>{event.preventDefault();event.stopPropagation();const open=group.classList.toggle('open');button.setAttribute('aria-expanded',String(open))};
  document.addEventListener('click',event=>{if(!group.contains(event.target))close()});
  document.addEventListener('keydown',event=>{if(event.key==='Escape')close()});
  return group;
}

function createDownloadsMenu(){
  const b71=manuals.find(manual=>manual.slug==='b71-manual');
  const otherManuals=manuals.filter(manual=>manual!==b71);
  const group=document.createElement('div');group.className='downloads-nav';
  group.innerHTML=`<a href="/downloads/">Downloads</a><button type="button" aria-label="Open Downloads mega menu" aria-expanded="false">&#8964;</button><div class="downloads-menu"><section class="mega-intro"><span class="mega-eyebrow">Support center</span><h2>Manuals for a smoother setup.</h2><a class="mega-primary" href="/downloads/">Explore all downloads &rarr;</a></section><section class="mega-manuals"><div class="mega-section-head"><b>Instruction manuals</b><a href="/downloads/">VIEW ALL</a></div><div class="mega-links">${otherManuals.map(manual=>`<a href="/downloads/${manual.slug}/">${manual.title}</a>`).join('')}</div></section><section class="mega-feature"><span class="mega-eyebrow">Featured manual</span><div class="mega-feature-image"><img src="/assets/manuals/b71/B71-en-preview.jpg" alt="B71 manual preview"></div><h3>${b71?.title||'B71 Manual'}</h3><p>Official operating instructions available locally in six languages.</p><div class="mega-badges"><span>EN</span><span>ES</span><span>IT</span><span>DE</span><span>FR</span><span>&#20013;&#25991;</span></div><a href="/downloads/b71-manual/">Open B71 Manual &rarr;</a><div class="mega-support"><b>Need technical help?</b><a href="mailto:sales03@trolinkiot.com">sales03@trolinkiot.com</a></div></section></div>`;
  return wireMenu(group);
}

function createAboutMenu(){
  const group=document.createElement('div');group.className='about-nav';
  group.innerHTML=`<a href="/about/">About</a><button type="button" aria-label="Open About mega menu" aria-expanded="false">&#8964;</button><div class="about-menu"><section class="about-story"><span class="mega-eyebrow">About TrolinkTek</span><h2>Engineering connected mobility from Shenzhen.</h2><p>Meet the team, compliance credentials and manufacturing capabilities behind our global OEM/ODM programs.</p><a href="/about/">Discover our company &rarr;</a></section><section class="about-links"><h3>Explore TrolinkTek</h3><a href="/about/#certificates"><span>01</span>Certificates</a><a href="/about/#company"><span>02</span>Company profile</a><a href="/about/#factory"><span>03</span>Factory & capabilities</a><a href="/about/#team"><span>04</span>Team & partnerships</a><a href="/about/#location"><span>05</span>Google Maps</a></section><section class="about-proof"><img src="/assets/showroom.jpg" alt="TrolinkTek Shenzhen showroom"><span class="mega-eyebrow">Visit our facility</span><h3>Proof you can inspect.</h3><b>Shenzhen, China</b><p>Evaluate our team, product portfolio and supply capabilities.</p><a href="/about/#factory">View factory profile &rarr;</a></section></div>`;
  return wireMenu(group);
}

function initQuoteModal(){
  const trigger=[...document.querySelectorAll('.header>.btn')].find(link=>link.textContent.trim()==='Get a Quote');
  if(!trigger)return;
  let modal=document.querySelector('.quote-modal');
  if(!modal){
    modal=document.createElement('div');modal.className='quote-modal';modal.setAttribute('aria-hidden','true');
    modal.innerHTML=`<div class="quote-dialog" role="dialog" aria-modal="true" aria-labelledby="quote-modal-title"><button type="button" aria-label="Close inquiry form">&times;</button><h2 id="quote-modal-title">Tell us about your project.</h2><p>Share your target market, product interest and requirements. Our sales team will reply by email.</p><form><label>Name<input required name="name" placeholder="Your name"></label><label>Work email<input required type="email" name="email" placeholder="name@company.com"></label><label>Company<input name="company" placeholder="Company name"></label><label>Interested in<select name="interest"><option>Wireless CarPlay Adapters</option><option>CarPlay AI Boxes</option><option>Smart Car Screens</option><option>Motorcycle CarPlay</option><option>OEM / ODM project</option></select></label><label class="full">Project details<textarea name="message" placeholder="Target market, estimated volume and customization needs"></textarea></label><button class="btn full" type="submit">Send Inquiry</button><p class="form-status" role="status"></p></form></div>`;
    document.body.appendChild(modal);connectInquiryForm(modal.querySelector('form'),'Global inquiry popup');
    const close=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''};
    modal.querySelector('.quote-dialog>button').onclick=close;modal.onclick=event=>{if(event.target===modal)close()};document.addEventListener('keydown',event=>{if(event.key==='Escape')close()});
  }
  trigger.onclick=event=>{event.preventDefault();modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';modal.querySelector('input').focus()};
}
