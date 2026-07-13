const fs = require("fs");
const path = require("path");

const galleryDir = path.join(__dirname, "..", "public", "assets", "gallery");
const manifestPath = path.join(galleryDir, "manifest.json");
const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

const normalizeFilename = (filename) =>
  filename.normalize("NFC").toLowerCase();

const titleOverrides = {
  "milanesa silvestre.jpg": "MILANESA SILVESTRE",
  "entraña al hierro.jpg": "BIFE DE CHORIZO",
  "fetuccini a la carbonara.jpg": "FLAN CON DULCE DE LECHE",
  "especialidad cafetería.jpg": "CAFÉ DE ESPECIALIDAD",
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
    name: titleOverrides[normalizeFilename(filename)] || titleFromFilename(filename),
    filename,
    version: Math.round(fs.statSync(path.join(galleryDir, filename)).mtimeMs),
  }));

fs.writeFileSync(manifestPath, `${JSON.stringify(items, null, 2)}\n`);
console.log(`Galería actualizada: ${items.length} foto(s).`);
