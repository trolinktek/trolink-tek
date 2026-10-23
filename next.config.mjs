import { existsSync, readdirSync } from 'node:fs';
import { relative, resolve, sep } from 'node:path';

const root = process.cwd();
const ignored = new Set(['.git', '.next', 'dist', 'node_modules', 'public', 'temp', 'research', 'source-materials', 'output', 'qa-prelaunch']);

function collectLegacyPages(directory, pages = []) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (ignored.has(entry.name) || entry.name.startsWith('.qa-')) continue;
    const absolute = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      collectLegacyPages(absolute, pages);
    } else if (entry.isFile() && entry.name === 'index.html') {
      const rel = relative(root, absolute).split(sep).join('/');
      const route = rel === 'index.html' ? '/' : `/${rel.replace(/\/index\.html$/, '')}`;
      const destination = rel === 'index.html' ? '/_legacy/index.html' : `/_legacy/${rel}`;
      pages.push({ source: route, destination });
      if (route !== '/') pages.push({ source: `${route}/`, destination });
    }
  }
  return pages;
}

const legacyRewrites = existsSync(resolve(root, 'index.html')) ? collectLegacyPages(root) : [];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return { beforeFiles: legacyRewrites, afterFiles: [], fallback: [] };
  }
};

export default nextConfig;
