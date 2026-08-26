const source = [
  ['2517', 'Carplay Box:TAA01CPU:Allwinner A133 System:Android 10', 'jpg'],
  ['2518', 'Carplay Box:TAA02 CPU:QCM2290 Quad-Core A53 System:Android 11', 'jpg'],
  ['2519', 'Carplay Box:TAA03 CPU:QCM SM6225 System:Android 13', 'jpg'],
  ['2520', 'Carplay Box:TAA04 CPU:QCM2290 Quad-Core A53 System:Android 11', 'jpg'],
  ['2705', 'Carplay Box: W32', 'png'],
  ['2704', 'Carplay Box: W31', 'png'],
  ['2703', 'Carplay Box: W11', 'png'],
  ['2653', 'Carplay Box:G2 Quad-core CPU: QCM SM6125/6225 System:Android 13', 'png'],
  ['2641', 'Carplay Box:W1 Quad-core CPU: RK3528 System:Android 13', 'jpg'],
  ['2615', 'Carplay Box:W2 Quad-core CPU: Allwinner A133 System:Android 10', 'jpg'],
  ['2575', 'Carplay Box:TAA07 Quad-core CPU: RK3528 System:Android 13', 'jpg'],
  ['2574', 'Carplay Box:TAA06 CPU: Allwinner A133 System:Android 10', 'jpg'],
  ['2573', 'Carplay Box:TAA05 Octa-core CPU:QCM SM6115 System:Android 13', 'png'],
];

export const carplayAiBoxes = source.map(([id, title, extension]) => ({
  id,
  title,
  category: 'CarPlay AI Boxes',
  image: `/assets/products/carplay-ai-boxes/${id}.${extension}`,
  source_url: `https://www.trolinktek.com/products/${id}.html`,
}));
