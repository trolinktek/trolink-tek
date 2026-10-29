import { copyFileSync, cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve, sep } from 'node:path';
import { spawnSync } from 'node:child_process';
import { blogPosts } from '../src/blog-data.js';

const root = process.cwd();
const publicDir = resolve(root, 'public');
const legacyDir = resolve(publicDir, '_legacy');
const ignored = new Set(['.git', '.next', 'dist', 'node_modules', 'public', 'temp', 'research', 'source-materials', 'output', 'qa-prelaunch']);

function copyHtmlPages(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (ignored.has(entry.name) || entry.name.startsWith('.qa-')) continue;
    const absolute = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      copyHtmlPages(absolute);
    } else if (entry.isFile() && entry.name === 'index.html') {
      const rel = relative(root, absolute);
      const target = resolve(legacyDir, rel);
      mkdirSync(dirname(target), { recursive: true });
      copyFileSync(absolute, target);
    }
  }
}

function syncDirectory(name) {
  const source = resolve(root, name);
  if (!existsSync(source)) return;
  cpSync(source, resolve(publicDir, name), { recursive: true, force: true });
}

mkdirSync(publicDir, { recursive: true });
rmSync(legacyDir, { recursive: true, force: true });
// Materialize route shells before copying HTML into public/_legacy. The SEO
// prerenderer enriches those copies; creating a route afterward leaves the
// new URL absent from the deployable static output until a later build.
for (const post of blogPosts) {
  const route = resolve(root, 'blog', post.slug, 'index.html');
  if (!existsSync(route)) {
    mkdirSync(dirname(route), { recursive: true });
    writeFileSync(route, `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${post.title}</title><meta name="description" content="${post.excerpt}"><link rel="canonical" href="https://trolink-tek.com/blog/${post.slug}/"><link rel="stylesheet" href="/src/style.css"><link rel="stylesheet" href="/src/blog-article.css"><link rel="stylesheet" href="/src/blog-longform.css"></head><body><header class="header"><a class="brand" href="/"><img src="/assets/trolinktek-logo.png" alt="TrolinkTek"></a><nav><a href="/products/">Products</a><a href="/oem-odm/">OEM/ODM</a><a href="/solutions/">Solutions</a><a class="active" href="/blog/">Blog</a><a href="/about/">About</a></nav><a class="btn small" href="/#quote">Contact</a></header><div id="article-root"></div><footer><a href="/blog/">Blog</a> · <a href="/oem-odm/">OEM/ODM</a> · <a href="/#quote">Contact</a></footer></body></html>\n`, 'utf8');
  }
}
copyHtmlPages(root);
for (const directory of ['assets', 'content', 'src']) syncDirectory(directory);
for (const file of ['favicon.ico', 'robots.txt', 'sitemap.xml']) {
  const source = resolve(root, file);
  if (existsSync(source)) copyFileSync(source, resolve(publicDir, file));
}

const prerender = spawnSync(process.execPath, [resolve(root, 'scripts/prerender-content.mjs')], { cwd: root, stdio: 'inherit' });
if (prerender.status !== 0) throw new Error('SEO HTML pre-rendering failed.');

console.log('Prepared legacy pages and static assets for Next.js.');
