import { copyFileSync, cpSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { dirname, relative, resolve, sep } from 'node:path';

const root = process.cwd();
const publicDir = resolve(root, 'public');
const legacyDir = resolve(publicDir, '_legacy');
const ignored = new Set(['.git', '.next', 'dist', 'node_modules', 'public']);

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
copyHtmlPages(root);
for (const directory of ['assets', 'content', 'src']) syncDirectory(directory);
for (const file of ['favicon.ico', 'robots.txt', 'sitemap.xml']) {
  const source = resolve(root, file);
  if (existsSync(source)) copyFileSync(source, resolve(publicDir, file));
}

console.log('Prepared legacy pages and static assets for Next.js.');
