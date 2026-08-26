const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const desired = "/assets/company-strength-factory-integrated.png";
const roots = [
  path.join(root, "index.html"),
  path.join(root, "src"),
  path.join(root, "public"),
];
const extensions = new Set([".html", ".css", ".js", ".jsx", ".ts", ".tsx", ".json"]);
const assetPattern =
  /\/assets\/[A-Za-z0-9._/-]*(?:company-strength|strength-company|factory-strength)[A-Za-z0-9._/-]*\.(?:png|jpe?g|webp)/gi;

let replacements = 0;

function updateFile(file) {
  const original = fs.readFileSync(file, "utf8");
  const updated = original.replace(assetPattern, (match) => {
    if (match === desired) return match;
    replacements += 1;
    return desired;
  });
  if (updated !== original) fs.writeFileSync(file, updated, "utf8");
}

function walk(target) {
  if (!fs.existsSync(target)) return;
  const stat = fs.statSync(target);
  if (stat.isFile()) {
    if (extensions.has(path.extname(target).toLowerCase())) updateFile(target);
    return;
  }
  for (const entry of fs.readdirSync(target, { withFileTypes: true })) {
    if (["node_modules", "dist", ".git"].includes(entry.name)) continue;
    walk(path.join(target, entry.name));
  }
}

for (const target of roots) walk(target);
fs.writeFileSync(
  path.join(root, ".company-strength-update.json"),
  JSON.stringify({ replacements, desired }, null, 2),
);
