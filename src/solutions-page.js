import {initGlobalNav} from './global-nav.js?v=20260729-arabic-nav1';

const supportCards=[
  ['01','Portfolio planning','Shortlist the right adapter, AI box or display platform for your target vehicles, channel and price band.'],
  ['02','Samples & validation','Review samples, compatibility priorities, firmware behavior and packaging requirements before a commercial order.'],
  ['03','Brand localization','Coordinate logo application, boot experience, manuals, packaging and market-specific product presentation.'],
  ['04','Quality & delivery','Align inspection criteria, order milestones, packing details and shipment preparation with your purchasing team.'],
  ['05','Sales enablement','Build a clear product story with specifications, product imagery, installation guidance and technical documentation.'],
  ['06','After-sales support','Keep model, firmware and issue information organized so technical questions can be handled with useful context.']
];

const steps=[
  ['01','Share your market','Tell us your sales channel, target vehicles, price band, volume estimate and customization priorities.'],
  ['02','Shortlist platforms','Compare suitable CarPlay adapters, Android AI boxes, smart displays and motorcycle solutions.'],
  ['03','Evaluate samples','Confirm interface, connection behavior, vehicle compatibility and user experience on representative vehicles.'],
  ['04','Define your version','Lock the model, firmware requirements, branding, accessories, manuals and packaging configuration.'],
  ['05','Pilot and inspect','Review the approved sample, production checkpoints and shipment inspection requirements.'],
  ['06','Launch and scale','Plan replenishment, technical documentation, issue feedback and the next portfolio expansion.']
];

document.querySelector('#solutions-app').innerHTML=`
<header class="header"><a class="brand" href="/"><img src="/assets/trolinktek-logo.png" alt="TrolinkTek"></a><nav><a href="/products/">Products</a><a href="/oem-odm/">OEM/ODM</a><a class="active" href="/solutions/">Distributor</a><a href="/blog/">Blog</a><a href="/about/">About</a></nav><a class="btn small" href="#solution-quote">Get a Quote</a><button class="menu" aria-label="Open menu">&#9776;</button></header>
<main>
  <section class="solutions-hero">
    <div class="solutions-hero-copy"><div class="crumb"><a href="/">Home</a><span>/</span><span>Solutions</span></div><p class="section-label light">Distribution & channel programs</p><h1>Build a connected-car portfolio for your market.</h1><p>From product selection and sample evaluation to private labeling, shipment preparation and after-sales coordination, TrolinkTek helps distributors and automotive brands move with a clearer process.</p><div class="actions"><a class="btn" href="#solution-quote">Discuss Your Market</a><a class="btn ghost" href="/products/">Explore Products</a></div></div>
    <div class="solutions-hero-media"><img src="/assets/distributor-hero-carplay-clean-v3.png" alt="Driver using a clean Apple CarPlay interface in a modern vehicle"></div>
  </section>

  <section class="audience-grid" aria-label="TrolinkTek solution audiences">
    <article id="distributors"><span>01</span><h2>Distributors & Importers</h2><p>Portfolio planning, localized product mixes, sample evaluation and scalable supply coordination.</p><a href="#support">Explore distributor support &rarr;</a></article>
    <article id="brands"><span>02</span><h2>Brands & E-commerce Sellers</h2><p>Private-label execution across product appearance, firmware choices, packaging and retail content.</p><a href="#process">See the project process &rarr;</a></article>
    <article id="installers"><span>03</span><h2>Installers & Auto Shops</h2><p>Practical product selection, installation preparation, manuals and technical issue communication.</p><a href="/downloads/">Explore technical resources &rarr;</a></article>
  </section>

  <section class="solutions-section" id="support"><div class="solutions-heading"><div><p class="section-label">Channel support</p><h2>Support around the work your launch actually requires.</h2></div><p>Each program is scoped to the product, market and commercial model. The items below form a practical qualification checklist rather than a one-size-fits-all promise.</p></div><div class="support-grid">${supportCards.map(([n,title,copy])=>`<article><span>${n}</span><h3>${title}</h3><p>${copy}</p></article>`).join('')}</div></section>

  <section class="quality-split"><div class="quality-image"><img src="/assets/showroom.jpg" alt="TrolinkTek Shenzhen product showroom and facility" loading="lazy"></div><div class="quality-copy"><p class="section-label light">Manufacturing coordination</p><h2>Turn requirements into reviewable checkpoints.</h2><p>A reliable program needs more than a product list. Before scaling, align the approved configuration, sample benchmark, inspection points, packaging details and shipment documentation.</p><ul><li>Incoming material and assembly checkpoints</li><li>Firmware, connection and functional verification</li><li>Appearance, accessories and packaging review</li><li>Pre-shipment inspection and issue records</li></ul><a class="btn" href="/about/#factory">View Factory Capabilities</a></div></section>

  <section class="solutions-section process" id="process"><div class="solutions-heading"><div><p class="section-label">Cooperation process</p><h2>Six steps from market brief to repeat order.</h2></div><p>The sequence keeps commercial, technical and presentation decisions visible to both teams.</p></div><div class="process-grid">${steps.map(([n,title,copy],i)=>`<article><span>${n}</span><div class="process-image"><img src="/assets/${['oem-process-design.webp','oem-odm-engineering-hero-v2.png?v=20260803-2','oem-process-branding.webp','oem-process-packaging.webp','oem-process-delivery.webp','solutions-launch-scale.png'][i]}" alt="${title} stage of the TrolinkTek cooperation process" loading="lazy"></div><h3>${title}</h3><p>${copy}</p></article>`).join('')}</div></section>

  <section class="portfolio-band"><div><p class="section-label light">Connected-drive portfolio</p><h2>Start with the product category that fits your channel.</h2></div><div class="portfolio-links"><a href="/products/wireless-carplay-adapters/"><b>Wireless CarPlay Adapter</b><span>Convert factory wired systems to a cable-free connection &rarr;</span></a><a href="/products/?category=CarPlay%20AI%20Boxes#catalog"><b>CarPlay AI Box</b><span>Add Android applications and connected entertainment &rarr;</span></a><a href="/products/?category=Smart%20Car%20Screens#catalog"><b>Smart Car Screen</b><span>Upgrade vehicles with a plug-and-play display &rarr;</span></a><a href="/products/?category=Smart%20Car%20Screens#catalog"><b>Motorcycle CarPlay</b><span>Navigation and communication for rider-focused displays &rarr;</span></a></div></section>

  <section class="solutions-section faq"><div class="solutions-heading"><div><p class="section-label">Buyer questions</p><h2>What to clarify before requesting a quotation.</h2></div></div><div class="faq-grid"><details open><summary>What information should a distributor send first?</summary><p>Share the destination market, sales channel, target vehicle types, preferred product category, expected order range and any brand or packaging requirements.</p></details><details><summary>Can products and packaging be customized?</summary><p>Customization depends on the selected platform, quantity and technical scope. Logo, housing, boot experience, accessories, manuals and packaging should be reviewed item by item.</p></details><details><summary>How should compatibility be evaluated?</summary><p>Define representative vehicles and factory infotainment conditions, then validate samples against an agreed checklist. Do not rely on a single vehicle test for a broad market claim.</p></details><details><summary>What happens after the first shipment?</summary><p>Keep model, batch, firmware and issue evidence connected. This makes technical support, replenishment planning and future product updates more efficient.</p></details></div></section>

  <section class="solution-cta" id="solution-quote"><div><p class="section-label light">Start a distribution conversation</p><h2>Tell us where and how you plan to sell.</h2><p>Send your market, product category, estimated volume and customization requirements. We will use the information to prepare a more relevant product shortlist.</p><a href="mailto:sales03@trolinkiot.com">sales03@trolinkiot.com</a></div><a class="btn light-cta" href="/#quote">Send Your Requirements</a></section>
</main>
<footer><div class="footer-brand"><img src="/assets/trolinktek-logo.png" alt="TrolinkTek"><p>Connected-drive products engineered for your market.</p></div><div><b>Solutions</b><a href="#distributors">Distributors</a><a href="#brands">Private Label</a><a href="#installers">Installers</a></div><div><b>Explore</b><a href="/products/">Products</a><a href="/downloads/">Downloads</a><a href="/blog/">Blog</a></div><div><b>Company</b><a href="/about/">About TrolinkTek</a><a href="/about/#factory">Factory</a><a href="mailto:sales03@trolinkiot.com">Contact</a></div><p class="copyright">Shenzhen TrolinkTek Technology Co., Ltd. &copy; All Rights Reserved.</p></footer>`;

initGlobalNav();
const header=document.querySelector('.header');
document.querySelector('.menu').onclick=()=>header.classList.toggle('open');
