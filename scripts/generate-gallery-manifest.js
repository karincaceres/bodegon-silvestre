const fs = require("fs");
const path = require("path");

const galleryDir = path.join(__dirname, "..", "public", "assets", "gallery");
const manifestPath = path.join(galleryDir, "manifest.json");
const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

const titleOverrides = {
  "milanesa.jpg": "MILANESA SILVESTRE",
  "asado.jpg": "ENTRAÑA AL HIERRO",
  "ravioles.jpg": "FETUCCINI A LA CARBONARA",
  "old-fashioned.jpg": "SILVESTRE WHITE RUSSIAN",
};

const titleFromFilename = (filename) =>
  path
    .basename(filename, path.extname(filename))
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();

fs.mkdirSync(galleryDir, { recursive: true });

const items = fs
  .readdirSync(galleryDir)
  .filter((filename) => imageExtensions.has(path.extname(filename).toLowerCase()))
  .sort((a, b) => a.localeCompare(b, "es", { numeric: true }))
  .map((filename) => ({
    name: titleOverrides[filename] || titleFromFilename(filename),
    filename,
    version: Math.round(fs.statSync(path.join(galleryDir, filename)).mtimeMs),
  }));

fs.writeFileSync(manifestPath, `${JSON.stringify(items, null, 2)}\n`);
console.log(`Galería actualizada: ${items.length} foto(s).`);
