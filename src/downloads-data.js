const languageNames={en:'English',es:'Español',it:'Italiano',de:'Deutsch',fr:'Français',cn:'中文'};
const localFiles=(slug,codes)=>Object.fromEntries(codes.map(code=>[code,`/assets/manuals/${slug}/${code}.png`]));

export const manuals=[
 {slug:'four-in-one-instruction-manual',title:'Four-in-One Instruction Manual',source:'https://www.trolinktek.com/four-in-one-instruction-manual/',languages:['en','es','it','de','fr','cn'],files:localFiles('four-in-one-instruction-manual',['en','es','it','de','fr','cn']),summary:'Official setup and operating instructions for the four-in-one CarPlay adapter in six languages.'},
 {slug:'two-in-one-instruction-manual',title:'Two-in-One Instruction Manual',source:'https://www.trolinktek.com/two-in-one-instruction-manual/',languages:['en','es','it','de','fr','cn'],files:localFiles('two-in-one-instruction-manual',['en','es','it','de','fr','cn']),summary:'Official setup and operating instructions for the two-in-one CarPlay adapter in six languages.'},
 {slug:'three-in-one-instruction-manual',title:'Three-in-One Instruction Manual',source:'https://www.trolinktek.com/Three-in-one-instruction-manual/',languages:['en','es','it','de','fr','cn'],files:localFiles('three-in-one-instruction-manual',['en','es','it','de','fr','cn']),summary:'Official setup and operating instructions for the three-in-one CarPlay adapter in six languages.'},
 {slug:'8730-manual',title:'8730 Manual',source:'https://www.trolinktek.com/8730Manual/',languages:['en','it','de','fr','cn'],files:localFiles('8730-manual',['en','it','de','fr','cn']),summary:'Official model 8730 operating instructions in five verified languages.'},
 {slug:'b71-manual',title:'B71 Manual',source:'https://www.trolinktek.com/b71-manual/',languages:['en','es','it','de','fr','cn'],files:localFiles('b71-manual',['en','es','it','de','fr','cn']),summary:'Official B71 operating instructions in six languages.'}
];

export const languagesFor=manual=>(manual.languages||[]).map(code=>[code,languageNames[code]]);
export const imageUrl=(manual,lang)=>manual.files?.[lang]||'';
export const downloadUrl=(manual,lang)=>imageUrl(manual,lang);
