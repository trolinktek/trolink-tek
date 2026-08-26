import fs from 'node:fs/promises';

const endpoint='http://127.0.0.1:9223';
const base='http://127.0.0.1:4173';
const sitemap=await fs.readFile(new URL('../public/sitemap.xml',import.meta.url),'utf8');
const sitemapPaths=[...sitemap.matchAll(/<loc>https:\/\/www\.trolinktek\.com([^<]*)<\/loc>/g)].map(match=>match[1]||'/');
const templatePaths=[
  '/',
  '/products/',
  '/products/catalog/carplay-adapter-b430-cpu-v851s3-2701/',
  '/downloads/',
  '/downloads/b71-manual/',
  '/blog/',
  '/blog/wireless-carplay-adapter-compatibility-checklist/',
  '/about/',
  '/thank-you/'
];

const endpointResults=[];
for(const path of sitemapPaths){
  try{
    const response=await fetch(base+path,{redirect:'manual'});
    endpointResults.push({path,status:response.status,ok:response.status===200});
  }catch(error){
    endpointResults.push({path,status:0,ok:false,error:error.message});
  }
}

const pageInfo=await fetch(`${endpoint}/json/new?${encodeURIComponent('about:blank')}`,{method:'PUT'}).then(response=>response.json());
const socket=new WebSocket(pageInfo.webSocketDebuggerUrl);
await new Promise((resolve,reject)=>{socket.onopen=resolve;socket.onerror=reject});
let id=0;
const pending=new Map();
socket.onmessage=event=>{
  const message=JSON.parse(event.data);
  if(message.id&&pending.has(message.id)){
    const {resolve,reject}=pending.get(message.id);pending.delete(message.id);
    if(message.error)reject(new Error(message.error.message));else resolve(message.result);
  }
};
const send=(method,params={})=>new Promise((resolve,reject)=>{
  const requestId=++id;pending.set(requestId,{resolve,reject});
  socket.send(JSON.stringify({id:requestId,method,params}));
});
await send('Page.enable');
await send('Runtime.enable');

async function evaluate(expression){
  const result=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});
  if(result.exceptionDetails)throw new Error(result.exceptionDetails.text||'Browser evaluation failed');
  return result.result?.value;
}
async function waitForReady(expectedPath){
  for(let attempt=0;attempt<80;attempt++){
    let ready=false;
    try{ready=await evaluate(`document.readyState==='complete'&&location.pathname===${JSON.stringify(expectedPath)}`)}catch{}
    if(ready){await new Promise(resolve=>setTimeout(resolve,250));return}
    await new Promise(resolve=>setTimeout(resolve,100));
  }
  throw new Error('Page load timeout');
}
async function navigate(path,width){
  await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<600});
  await send('Page.navigate',{url:base+path});
  await new Promise(resolve=>setTimeout(resolve,900));
  const currentPath=await evaluate('location.pathname');
  if(currentPath!==new URL(path,base).pathname)throw new Error(`Unexpected route: ${currentPath}`);
}

const rendered=[];
await fs.mkdir(new URL('../qa-prelaunch/',import.meta.url),{recursive:true});
for(const width of [1440,390]){
  for(const path of templatePaths){
    console.error(`Auditing ${width}px ${path}`);
    await navigate(path,width);
    const audit=await evaluate(`(()=>{
      const internal=[...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href')).filter(h=>h&&h.startsWith('/'));
      return {
        path:location.pathname,width:${width},
        title:document.title,
        description:document.querySelector('meta[name="description"]')?.content||'',
        canonical:document.querySelector('link[rel="canonical"]')?.href||'',
        h1:document.querySelectorAll('h1').length,
        header:!!document.querySelector('.header'),
        footer:!!document.querySelector('footer'),
        overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,
        images:[...document.images].length,
        brokenImages:[...document.images].filter(img=>img.complete&&img.naturalWidth===0).map(img=>img.src),
        missingAlt:[...document.images].filter(img=>!img.hasAttribute('alt')||!img.alt.trim()).map(img=>img.src),
        internal:[...new Set(internal)]
      };
    })()`);
    rendered.push(audit);
    if(['/', '/products/', '/about/'].includes(path)){
      const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
      const name=path==='/'?'home':path.split('/').filter(Boolean)[0];
      await fs.writeFile(new URL(`../qa-prelaunch/${name}-${width}.png`,import.meta.url),Buffer.from(shot.data,'base64'));
    }
  }
}

await navigate('/',1440);
await evaluate(`document.querySelector('.language-trigger')?.click()`);
const languageMenu=await evaluate(`({
  open:document.querySelector('.language-nav')?.classList.contains('open'),
  expanded:document.querySelector('.language-trigger')?.getAttribute('aria-expanded'),
  languages:[...document.querySelectorAll('.language-menu [data-language]')].map(button=>button.dataset.language),
  selected:document.querySelector('.language-menu [aria-checked="true"]')?.dataset.language,
  documentLanguage:document.documentElement.lang,
  documentDirection:document.documentElement.dir
})`);
await evaluate(`document.querySelector('.language-trigger')?.click()`);
const modalInitial=await evaluate(`({open:document.querySelector('.quote-modal')?.classList.contains('open'),hidden:document.querySelector('.quote-modal')?.getAttribute('aria-hidden')})`);
await evaluate(`document.querySelector('.header>.btn')?.click()`);
const modalOpened=await evaluate(`({open:document.querySelector('.quote-modal')?.classList.contains('open'),hidden:document.querySelector('.quote-modal')?.getAttribute('aria-hidden'),close:!!document.querySelector('.quote-dialog>button')})`);
await evaluate(`document.querySelector('.quote-dialog>button')?.click()`);
const modalClosed=await evaluate(`({open:document.querySelector('.quote-modal')?.classList.contains('open'),hidden:document.querySelector('.quote-modal')?.getAttribute('aria-hidden')})`);
await evaluate(`document.querySelector('.downloads-nav>button')?.click()`);
const downloadsMega=await evaluate(`({open:document.querySelector('.downloads-nav')?.classList.contains('open'),display:getComputedStyle(document.querySelector('.downloads-menu')).display})`);
await evaluate(`document.querySelector('.downloads-nav>button')?.click();document.querySelector('.about-nav>button')?.click()`);
const aboutMega=await evaluate(`({open:document.querySelector('.about-nav')?.classList.contains('open'),display:getComputedStyle(document.querySelector('.about-menu')).display})`);
await evaluate(`document.querySelector('.about-nav>button')?.click();document.querySelector('.header>.btn')?.click();const f=document.querySelector('.quote-modal form');f.querySelector('[name="name"]').value='QA Test';f.querySelector('[name="email"]').value='qa@example.com';window.fetch=async()=>({ok:true,json:async()=>({ok:true})});f.requestSubmit()`);
await new Promise(resolve=>setTimeout(resolve,500));
const mockedSubmit=await evaluate(`({path:location.pathname})`);

await navigate('/products/',1440);
await evaluate(`document.querySelector('[data-inquire]')?.click()`);
const productInquiry=await evaluate(`({open:document.querySelector('.quote-modal')?.classList.contains('open'),interest:document.querySelector('.quote-modal select[name="interest"]')?.value})`);

await navigate('/',390);
await evaluate(`document.querySelector('.menu')?.click()`);
const mobileNav=await evaluate(`({open:document.querySelector('.header')?.classList.contains('open'),navDisplay:getComputedStyle(document.querySelector('.header nav')).display})`);
await evaluate(`document.querySelector('.header>.btn')?.click()`);
const mobileModal=await evaluate(`({open:document.querySelector('.quote-modal')?.classList.contains('open'),dialogWidth:Math.round(document.querySelector('.quote-dialog')?.getBoundingClientRect().width||0),viewport:innerWidth})`);

await navigate('/',1440);
await evaluate(`document.querySelector('.language-trigger')?.click();document.querySelector('[data-language="es"]')?.click()`);
await new Promise(resolve=>setTimeout(resolve,4200));
const translationSpanish=await evaluate(`({
  language:document.documentElement.lang,
  direction:document.documentElement.dir,
  stored:localStorage.getItem('trolinktek-language'),
  heading:document.querySelector('h1')?.textContent.trim()
})`);
await evaluate(`localStorage.setItem('trolinktek-language','en');document.cookie='googtrans=;path=/;max-age=0;SameSite=Lax'`);

const uniqueInternal=[...new Set(rendered.flatMap(item=>item.internal))].filter(path=>!path.includes('#'));
const internalResults=[];
for(const path of uniqueInternal){
  try{
    const response=await fetch(new URL(path,base),{redirect:'manual'});
    internalResults.push({path,status:response.status,ok:response.status>=200&&response.status<400});
  }catch(error){
    internalResults.push({path,status:0,ok:false,error:error.message});
  }
}

const report={
  generatedAt:new Date().toISOString(),
  sitemap:{count:sitemapPaths.length,failed:endpointResults.filter(item=>!item.ok),results:endpointResults},
  rendered,
  interactions:{languageMenu,translationSpanish,modalInitial,modalOpened,modalClosed,downloadsMega,aboutMega,mockedSubmit,productInquiry,mobileNav,mobileModal},
  internalLinks:{count:uniqueInternal.length,failed:internalResults.filter(item=>!item.ok),results:internalResults}
};
await fs.writeFile(new URL('../prelaunch-audit.json',import.meta.url),JSON.stringify(report,null,2));
console.log(JSON.stringify({
  sitemapPages:report.sitemap.count,
  sitemapFailures:report.sitemap.failed.length,
  renderedChecks:rendered.length,
  renderedProblems:rendered.filter(item=>item.overflow>2||item.h1!==1||!item.title||!item.description||item.brokenImages.length||item.missingAlt.length).length,
  internalLinks:report.internalLinks.count,
  internalFailures:report.internalLinks.failed.length,
  interactions:report.interactions
},null,2));
socket.close();
