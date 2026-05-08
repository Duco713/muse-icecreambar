#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'images');
const TARGET_WIDTHS = [320, 640, 960, 1280, 1920];
const SOURCE_EXT = /\.(jpe?g|png|webp)$/i;
const VARIANT_RE = /-\d{3,4}\.(webp|avif)$/i;

const QUALITY = { webp: 75, avif: 50 };

async function processOne(file) {
  const abs = path.join(SRC_DIR, file);
  const base = file.replace(SOURCE_EXT, '');
  const meta = await sharp(abs).metadata();
  const naturalWidth = meta.width;

  const widths = TARGET_WIDTHS.filter((w) => w < naturalWidth);
  if (widths.length === 0) {
    console.log(`  skip ${file} (natural ${naturalWidth}px ≤ smallest target)`);
    return { file, naturalWidth, generated: 0 };
  }

  let generated = 0;
  for (const w of widths) {
    for (const fmt of ['webp', 'avif']) {
      const out = path.join(SRC_DIR, `${base}-${w}.${fmt}`);
      if (fs.existsSync(out)) continue;
      const pipeline = sharp(abs).resize({ width: w, withoutEnlargement: true });
      if (fmt === 'webp') {
        await pipeline.webp({ quality: QUALITY.webp }).toFile(out);
      } else {
        await pipeline.avif({ quality: QUALITY.avif, effort: 4 }).toFile(out);
      }
      generated += 1;
    }
  }
  console.log(`  ${file}: natural ${naturalWidth}px → ${widths.join(',')} (${generated} files)`);
  return { file, naturalWidth, generated };
}

async function main() {
  const all = fs.readdirSync(SRC_DIR).filter((f) => SOURCE_EXT.test(f) && !VARIANT_RE.test(f));
  console.log(`Found ${all.length} source images in ${SRC_DIR}`);
  let totalGenerated = 0;
  for (const f of all.sort()) {
    const r = await processOne(f);
    totalGenerated += r.generated;
  }
  console.log(`\nDone. Generated ${totalGenerated} variant files.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
