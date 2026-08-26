import { products } from './products-full-data.js?v=20260721-6';
import { carplayAdapters } from './carplay-adapters-data.js?v=20260817-b17-image1';
import { carplayAiBoxes } from './carplay-ai-boxes-data.js?v=20260803-source-refresh1';
import { smartCarScreens } from './smart-car-screens-data.js?v=20260803-source-refresh1';
import { initGlobalNav } from './global-nav.js?v=20260729-arabic-nav1';
import { connectInquiryForm } from './form-submit.js';

const slug = location.pathname.split('/').filter(Boolean).pop();
const requestedId = new URLSearchParams(location.search).get('id');
const existingById = new Map(products.map((item) => [item.id, item]));
const normalizeProduct = (item) => {
  const existing = existingById.get(item.id);
  if (existing) return existing;
  return {
    ...item,
    slug: `product-${item.id}`,
    local_url: `/products/detail/?id=${encodeURIComponent(item.id)}`,
    gallery: item.gallery || [],
    specs: [
      { label: 'Model ID', value: item.id },
      { label: 'Product', value: item.title },
      { label: 'Category', value: item.category }
    ]
  };
};
const catalogProducts = [
  ...products,
  ...carplayAdapters.filter((item) => !existingById.has(item.id)).map(normalizeProduct),
  ...carplayAiBoxes.filter((item) => !existingById.has(item.id)).map(normalizeProduct),
  ...smartCarScreens.filter((item) => !existingById.has(item.id)).map(normalizeProduct)
];
const product = (requestedId
  ? catalogProducts.find((item) => item.id === requestedId)
  : catalogProducts.find((item) => item.slug === slug)) || catalogProducts[0];
const model = product.specs.find((spec) => spec.label.toLowerCase() === 'model')?.value || product.title;
const productImages = [...new Set([product.image, ...product.gallery])];
const overviewImages = productImages.slice(0, Math.min(4, productImages.length));
const detailImages = productImages.slice(overviewImages.length);
const related = catalogProducts
  .filter((item) => item.category === product.category && item.slug !== product.slug)
  .slice(0, 3);
const ensureMeta=(name,content)=>{
  let meta=document.head.querySelector(`meta[name="${name}"]`);
  if(!meta){meta=document.createElement('meta');meta.name=name;document.head.appendChild(meta)}
  meta.content=content;
};
const ensureCanonical=(href)=>{
  let link=document.head.querySelector('link[rel="canonical"]');
  if(!link){link=document.createElement('link');link.rel='canonical';document.head.appendChild(link)}
  link.href=href;
};

const detailGalleryStyles = document.createElement('style');
detailGalleryStyles.textContent = `
  .product-detail-images{margin-top:70px}
  .detail-images-heading{border-top:1px solid var(--line);padding:34px 0 24px}
  .detail-images-heading h3{font-size:30px;letter-spacing:-.035em;margin:10px 0 0}
  .product-detail-images figure{margin:0 0 24px;border:1px solid var(--line);background:#fff;overflow:hidden}
  .product-detail-images figure img{display:block;width:100%;height:auto;object-fit:contain}
`;
document.head.append(detailGalleryStyles);

document.title = `${product.title} | TrolinkTek`;
ensureMeta('description',`${product.title} from Shenzhen TrolinkTek Technology Co., Ltd. Review official product images and published parameters, then request current specifications and OEM/ODM options.`);
ensureCanonical(`https://www.trolinktek.com${product.local_url}`);
document.querySelector('#product-app').innerHTML = `
  <header class="header">
    <a class="brand" href="/"><img src="/assets/trolinktek-logo.png" alt="TrolinkTek"></a>
    <nav>
      <a href="/products/">Products</a><a href="/#oem">OEM/ODM</a><a href="/#solutions">Solutions</a>
      <a href="/blog/">Blog</a><a href="/about/">About</a>
    </nav>
    <a class="btn small" href="#product-quote">Get a Quote</a>
    <button class="menu" aria-label="Open menu">&#9776;</button>
  </header>
  <main>
    <section class="detail-hero">
      <div class="detail-media"><img id="main-product-image" src="${product.image}" alt="${product.title}"></div>
      <div class="detail-copy">
        <div class="crumb"><a href="/">Home</a><span>/</span><a href="/products/">Products</a><span>/</span><span>${product.category}</span></div>
        <p class="detail-category">${product.category}</p>
        <h1>${product.title}</h1>
        <p>Review the complete product information, official images and published specifications below, then contact TrolinkTek to confirm compatibility, availability and customization options.</p>
        <div class="actions">
          <a class="btn" href="#product-quote">Request Specifications</a>
          <a class="btn outline-dark" href="#official-gallery">View Official Gallery &rarr;</a>
          ${product.source_url ? `<a class="text-link" href="${product.source_url}" target="_blank" rel="noopener noreferrer">Original product reference &rarr;</a>` : ''}
        </div>
      </div>
    </section>
    <section class="detail-body">
      <aside>
        <p class="section-label">Product record</p>
        <dl>
          <div><dt>Model ID</dt><dd>${model}</dd></div>
          <div><dt>Category</dt><dd>${product.category}</dd></div>
          ${product.updated ? `<div><dt>Product updated</dt><dd>${product.updated}</dd></div>` : ''}
          <div><dt>Manufacturer</dt><dd>Shenzhen TrolinkTek Technology Co., Ltd.</dd></div>
        </dl>
      </aside>
      <div>
        <section class="spec-section">
          <div class="section-head">
            <div><p class="section-label">Published specifications</p><h2>Product parameters.</h2></div>
            <p>Review the published parameters below and contact our team for the latest specification sheet before ordering.</p>
          </div>
          <div class="spec-grid">${product.specs.length
            ? product.specs.map((spec) => `<div><span>${spec.label}</span><b>${spec.value}</b></div>`).join('')
            : '<div><span>Specifications</span><b>Contact sales for the current specification sheet.</b></div>'}
          </div>
        </section>
        <section class="gallery-section" id="official-gallery">
          <div class="section-head">
            <div><p class="section-label">Official product content</p><h2>Complete product gallery.</h2></div>
            <p>${productImages.length} official product image${productImages.length === 1 ? '' : 's'} collected from TrolinkTek and available on this page.</p>
          </div>
          <div class="detail-gallery overview-gallery">${overviewImages.map((image, index) => `
            <button data-image="${image}" aria-label="View product image ${index + 1}">
              <img src="${image}" alt="${product.title} official image ${index + 1}" onerror="this.closest('button').remove()">
            </button>`).join('')}
          </div>
          ${detailImages.length ? `<div class="product-detail-images">
            <div class="detail-images-heading"><p class="section-label">Product details</p><h3>Official product details.</h3></div>
            ${detailImages.map((image, index) => `<figure>
              <img src="${image}" alt="${product.title} product detail ${index + 1}" onerror="this.closest('figure').remove()">
            </figure>`).join('')}
          </div>` : ''}
        </section>
      </div>
    </section>
    <section class="related-products">
      <div class="section-head"><div><p class="section-label light">Same category</p><h2>Related ${product.category}.</h2></div><a href="/products/">View all products &rarr;</a></div>
      <div>${related.map((item) => `<article><a href="${item.local_url}"><img src="${item.image}" alt="${item.title}"></a><h3>${item.title}</h3><a href="${item.local_url}">View details &rarr;</a></article>`).join('')}</div>
    </section>
    <section class="quote detail-quote" id="product-quote">
      <div><p class="section-label light">Product inquiry</p><h2>Confirm this product for your market.</h2><p>Ask for the latest specification sheet, price, MOQ, customization and compatibility information.</p></div>
      <form>
        <label>Name<input required name="name"></label><label>Work email<input required type="email" name="email"></label>
        <label>Company<input name="company"></label><label>Product<input name="product" value="${product.title}" readonly></label>
        <label class="full">Requirements<textarea name="message"></textarea></label>
        <button class="btn full">Request Product Details</button><p class="form-status" role="status"></p>
      </form>
    </section>
  </main>
  <footer>
    <div class="footer-brand"><img src="/assets/trolinktek-logo.png" alt="TrolinkTek"><p>Connected-drive and wireless products engineered for your market.</p></div>
    <div><b>Products</b><a href="/products/">All Products</a><a href="/products/wireless-carplay-adapters/">CarPlay Adapters</a></div>
    <div><b>Support</b><a href="/downloads/">Downloads</a><a href="/about/">About TrolinkTek</a></div>
    <div><b>Contact</b><a href="mailto:sales03@trolinkiot.com">sales03@trolinkiot.com</a></div>
    <p class="copyright">Shenzhen TrolinkTek Technology Co., Ltd. &copy; All Rights Reserved.</p>
  </footer>`;

initGlobalNav();
const header = document.querySelector('.header');
document.querySelector('.menu').onclick = () => header.classList.toggle('open');
document.querySelectorAll('[data-image]').forEach((button) => {
  button.onclick = () => {
    document.querySelector('#main-product-image').src = button.dataset.image;
    scrollTo({ top: 0, behavior: 'smooth' });
  };
});
connectInquiryForm(document.querySelector('form'), `Product detail inquiry: ${product.title}`);
