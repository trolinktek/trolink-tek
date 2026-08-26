import {readdir, stat, writeFile} from 'node:fs/promises';
import {join, relative, resolve, sep} from 'node:path';

const root = resolve(import.meta.dirname, '..');
const siteUrl = 'https://www.trolinktek.com';
const sitemapPath = join(root, 'public', 'sitemap.xml');

const excludedTopLevelDirectories = new Set([
  '.agents',
  '.git',
  '.learnings',
  '.pnpm-store',
  '.qa-chrome-new-banner',
  '.qa-prelaunch-chrome',
  'api',
  'assets',
  'content',
  'dist',
  'node_modules',
  'output',
  'public',
  'qa-prelaunch',
  'research',
  'scripts',
  'source-materials',
  'src',
  'temp',
  'thank-you'
]);

const excludedRoutes = new Set([
  '/downloads/aroma-carplay-manual/'
]);

const pages = [];

async function collect(directory) {
  for (const entry of await readdir(directory, {withFileTypes: true})) {
    if (entry.name.startsWith('.') && directory === root) continue;
    const fullPath = join(directory, entry.name);
    const relativePath = relative(root, fullPath);
    const topLevel = relativePath.split(sep)[0];

    if (excludedTopLevelDirectories.has(topLevel)) continue;

    if (entry.isDirectory()) {
      await collect(fullPath);
      continue;
    }

    if (entry.name !== 'index.html') continue;

    const routeDirectory = relative(root, directory).split(sep).join('/');
    const route = routeDirectory ? `/${routeDirectory}/` : '/';
    if (excludedRoutes.has(route)) continue;

    const modified = await stat(fullPath);
    pages.push({route, lastmod: modified.mtime.toISOString().slice(0, 10)});
  }
}

await collect(root);
pages.sort((a, b) => a.route === '/' ? -1 : b.route === '/' ? 1 : a.route.localeCompare(b.route));

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(({route, lastmod}) => `  <url><loc>${siteUrl}${route}</loc><lastmod>${lastmod}</lastmod></url>`).join('\n')}
</urlset>
`;

await writeFile(sitemapPath, xml, 'utf8');
console.log(`Generated ${relative(root, sitemapPath)} with ${pages.length} URLs.`);
