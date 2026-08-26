export const carplayAdapters = [
  ['2659','Carplay Adapter:B414(orange) CPU:AX1800','png'], ['2702','Carplay Adapter:B432','png'],
  ['2701','Carplay Adapter:B430 CPU:V851S3','png'], ['2672','Carplay Adapter:B424 CPU:AX1800','jpg'],
  ['2671','Carplay Adapter:TAB0E CPU:AX1800','jpg'], ['2670','Carplay Adapter:B15A CPU:V851','jpg'],
  ['2668','Carplay Adapter:B121','png'],
  ['2664','Carplay Adapter:B421 CPU:AX1800','jpg'], ['2663','Carplay Adapter:B419 CPU:AX1800','jpg'],
  ['2662','Carplay Adapter:B418 CPU:AX1800','png'], ['2661','Carplay Adapter:B417 CPU:AX1800','png'],
  ['2660','Carplay Adapter:B416 CPU:AX1800','png'], ['2658','Carplay Adapter:B415 CPU:V821','png'],
  ['2655','Carplay Adapter:B413 CPU:AX1800','png'], ['2652','Carplay Adapter:B118 CPU:V851S','jpg'],
  ['2651','Carplay Adapter:B62 CPU:V821','jpg'], ['2649','Carplay Adapter:B17 CPU:AX1800','jpg'],
  ['2647','Carplay Adapter:B46 CPU:AX1800','jpg'], ['2645','Carplay Adapter:B44 CPU:AX1800','jpg'],
  ['2644','Carplay Adapter:B43 CPU:v851','jpg'], ['2643','Carplay Adapter:B42 CPU:AX1800','jpg'],
  ['2642','Carplay Adapter:B411 CPU:AX1800','jpg'], ['2640','Carplay Adapter:B41Z CPU:v851S','jpg'],
  ['2639','Carplay Adapter:B22P CPU:AX1800','jpg'], ['2638','Carplay Adapter:B16P CPU:AX1800','jpg'],
  ['2637','Carplay Adapter:B111P CPU:AX1800','png'], ['2636','Carplay Adapter:B114P CPU:v821','jpg'],
  ['2635','Carplay Adapter:B113P CPU:v821','jpg'], ['2633','Carplay Adapter:B112P CPU:AX1800','jpg'],
  ['2634','Carplay Adapter:B19P CPU:v821','png'], ['2632','Carplay Adapter:B18P CPU:AX1800','jpg'],
  ['2630','Carplay Adapter:B11A CPU:AX1800','jpg'], ['2629','Carplay Adapter:TAB0S CPU:V851S','jpg'],
  ['2614','Carplay Adapter:TAB0P CPU:V851S','jpg'], ['2586','Carplay Adapter:TAB0F CPU:V851S','jpg'],
  ['2584','Carplay Adapter:TAB0C CPU:V851S','jpg'],
  ['2583','Carplay Adapter:TAB0B CPU:V851S','jpg'], ['2582','Carplay Adapter:TAB0A CPU:V851S','jpg'],
  ['2581','Carplay Adapter:TAB09 CPU:V851S','jpg'], ['2580','Carplay Adapter:TAB08 CPU:V851S','jpg'],
  ['2579','Carplay Adapter:TAB07 CPU:V851S','jpg'], ['2578','Carplay Adapter:TAB06 CPU:V851S','jpg'],
  ['2577','Carplay Box:TAB05 CPU:V851S','jpg'], ['2576','Carplay Adapter:TAB01 CPU:V851S','png']
].map(([id,title,extension])=>{
  const image=id === '2579'
    ? '/assets/products/carplay-adapters/2579-single.jpg'
    : `/assets/products/carplay-adapters/${id}.${extension}`;
  return {
    id,
    title,
    category:'CarPlay Adapters',
    image,
    gallery:id === '2649' ? [image] : [],
    source_url:`https://www.trolinktek.com/products/${id}.html`
  };
});
