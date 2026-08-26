import {copyFileSync, cpSync, existsSync, mkdirSync, readdirSync, statSync} from 'node:fs';
import {dirname, relative, resolve, sep} from 'node:path';
import {defineConfig} from 'vite';

const projectRoot = process.cwd();
const sourceAssets = resolve(projectRoot, 'assets');
const publicAssets = resolve(projectRoot, 'public', 'assets');
const sourceContent = resolve(projectRoot, 'content');
const publicContent = resolve(projectRoot, 'public', 'content');

const collectHtmlInputs = (directory, inputs = {}) => {
  for (const entry of readdirSync(directory, {withFileTypes: true})) {
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git') continue;
    const absolutePath = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      collectHtmlInputs(absolutePath, inputs);
    } else if (entry.isFile() && entry.name === 'index.html') {
      const relativePath = relative(projectRoot, absolutePath);
      const name = relativePath === 'index.html'
        ? 'home'
        : relativePath.replace(new RegExp(`\\${sep}`, 'g'), '/').replace(/\/index\.html$/, '');
      inputs[name] = absolutePath;
    }
  }
  return inputs;
};

const copyAsset = (sourcePath) => {
  if (!existsSync(sourcePath) || !statSync(sourcePath).isFile()) return;
  const relativePath = relative(sourceAssets, sourcePath);
  if (relativePath.startsWith('..')) return;
  const destinationPath = resolve(publicAssets, relativePath);
  mkdirSync(dirname(destinationPath), {recursive: true});
  copyFileSync(sourcePath, destinationPath);
};

const syncRootAssets = () => {
  if (!existsSync(sourceAssets)) return;
  mkdirSync(publicAssets, {recursive: true});
  cpSync(sourceAssets, publicAssets, {recursive: true, force: true});
};

const syncContent = () => {
  if (!existsSync(sourceContent)) return;
  mkdirSync(publicContent, {recursive: true});
  cpSync(sourceContent, publicContent, {recursive: true, force: true});
};

const syncLocalAssets = () => ({
  name: 'sync-root-assets',
  buildStart() {
    syncRootAssets();
    syncContent();
  },
  configureServer(server) {
    syncRootAssets();
    syncContent();
    server.watcher.add(sourceAssets);
    server.watcher.on('add', copyAsset);
    server.watcher.on('change', copyAsset);
  }
});

const disableLocalCache = () => ({
  name: 'disable-local-cache',
  configureServer(server) {
    server.middlewares.use((request, response, next) => {
      response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      response.setHeader('Pragma', 'no-cache');
      response.setHeader('Expires', '0');
      response.setHeader('Surrogate-Control', 'no-store');
      next();
    });
  },
  configurePreviewServer(server) {
    server.middlewares.use((request, response, next) => {
      response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      response.setHeader('Pragma', 'no-cache');
      response.setHeader('Expires', '0');
      next();
    });
  }
});

export default defineConfig({
  plugins: [syncLocalAssets(), disableLocalCache()],
  build: {
    rollupOptions: {
      input: collectHtmlInputs(projectRoot)
    }
  }
});
