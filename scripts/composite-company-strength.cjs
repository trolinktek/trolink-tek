const path = require("node:path");
const sharp = require("sharp");

const [, , donorArg, baseArg, outputArg] = process.argv;
if (!donorArg || !baseArg) {
  process.stderr.write("Usage: node scripts/composite-company-strength.cjs <donor-image> <base-image> [output-image]\n");
  process.exit(1);
}

const donor = path.resolve(donorArg);
const base = path.resolve(baseArg);
const output = path.resolve(outputArg || "assets/company-strength-factory-integrated.png");

async function main() {
  const { width, height } = await sharp(base).metadata();
  const left = Math.round(width * 0.46);
  const overlayWidth = width - left;
  const overlayHeight = Math.round(height * 0.65);
  const mask = Buffer.from(`<svg width="${overlayWidth}" height="${overlayHeight}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="fadeX" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="white" stop-opacity="0"/><stop offset="22%" stop-color="white" stop-opacity=".14"/><stop offset="48%" stop-color="white" stop-opacity=".50"/><stop offset="100%" stop-color="white" stop-opacity=".66"/></linearGradient><linearGradient id="fadeY" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="white" stop-opacity="1"/><stop offset="74%" stop-color="white" stop-opacity=".92"/><stop offset="100%" stop-color="white" stop-opacity="0"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#fadeX)"/><rect width="100%" height="100%" fill="url(#fadeY)" style="mix-blend-mode:multiply"/></svg>`);
  const scene = await sharp(donor)
    .resize(overlayWidth, overlayHeight, { fit: "cover", position: "right center" })
    .modulate({ brightness: 0.78, saturation: 0.82 })
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();
  await sharp(base)
    .composite([{ input: scene, left, top: 0, blend: "over" }])
    .png({ compressionLevel: 9 })
    .toFile(output);
}

main().catch(error => {
  process.stderr.write(`${error.stack || error}\n`);
  process.exit(1);
});
