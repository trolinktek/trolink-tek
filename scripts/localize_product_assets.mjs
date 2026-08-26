import {mkdir, copyFile, writeFile, access} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {products} from '../src/products-full-data.js';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const outputRoot=path.join(root,'public','assets','products');
await mkdir(outputRoot,{recursive:true});

for(const product of products){
  const source=path.join(root,'assets','products',`${product.id}.jpg`);
  const target=path.join(outputRoot,`${product.id}.jpg`);
  if(existsSync(source)&&!existsSync(target))await copyFile(source,target);
}

const jobs=[];
for(const product of products){
  product.image=`/assets/products/${product.id}.jpg`;
  const localized=[product.image];
  let index=1;
  for(const url of product.gallery){
    if(!url.startsWith('http'))continue;
    let extension=path.extname(new URL(url).pathname).toLowerCase()||'.jpg';
    if(!/^\.(jpg|jpeg|png|webp|gif)$/.test(extension))extension='.jpg';
    const relative=`/assets/products/${product.id}/detail-${String(index).padStart(2,'0')}${extension}`;
    jobs.push({url,file:path.join(root,'public',relative),relative});
    localized.push(relative);index++;
  }
  product.gallery=[...new Set(localized)];
  product.source_url=product.local_url;
  product.original_source=product.local_url;
}

let completed=0,failed=[];
async function download(job){
  await mkdir(path.dirname(job.file),{recursive:true});
  try{await access(job.file);completed++;return}catch{}
  let lastError;
  for(let attempt=1;attempt<=3;attempt++){
    try{
      const response=await fetch(job.url,{headers:{'user-agent':'Mozilla/5.0 TrolinkTek Local Asset Migration'}});
      if(!response.ok)throw new Error(`HTTP ${response.status}`);
      const bytes=Buffer.from(await response.arrayBuffer());
      if(bytes.length<1000)throw new Error(`File too small: ${bytes.length}`);
      await writeFile(job.file,bytes);completed++;return;
    }catch(error){lastError=error;if(attempt<3)await new Promise(resolve=>setTimeout(resolve,attempt*700))}
  }
  failed.push({url:job.url,error:lastError?.message||'unknown'});
}

const queue=[...jobs];
await Promise.all(Array.from({length:8},async()=>{while(queue.length)await download(queue.shift())}));
if(failed.length){
  console.error(JSON.stringify({completed,failed:failed.length,examples:failed.slice(0,10)},null,2));
  process.exit(1);
}

await writeFile(path.join(root,'src','products-full-data.js'),`export const products = ${JSON.stringify(products,null,2)};\n`,'utf8');
console.log(JSON.stringify({products:products.length,localizedImages:completed,failed:0},null,2));
