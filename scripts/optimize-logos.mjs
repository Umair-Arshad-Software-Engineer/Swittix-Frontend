// scripts/optimize-logos.mjs
// Shrinks company logos so the Trusted-by marquee loads fast.
//
//   npm i -D sharp
//   node scripts/optimize-logos.mjs
//
// Reads  src/assets/Companylogos/*          (png / jpg / jpeg / webp / avif)
// Writes src/assets/Companylogos-opt/*.webp (max 320x240, transparency kept)
//
// TrustSection.jsx automatically prefers the optimized copies. Once you've checked
// the result, you can delete the originals from the app to shrink your bundle.

import { readdir, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'src/assets/Companylogos';
const OUT = 'src/assets/Companylogos-opt';
const MAX_W = 320; // tiles are at most 140x100 CSS px, so 320x240 covers 2x screens
const MAX_H = 240;

await mkdir(OUT, { recursive: true });

const files = (await readdir(SRC)).filter((f) => /\.(png|jpe?g|webp|avif)$/i.test(f));
let before = 0;
let after = 0;

for (const file of files) {
  const input = path.join(SRC, file);
  const output = path.join(OUT, file.replace(/\.[^.]+$/, '') + '.webp');

  await sharp(input)
    .resize({ width: MAX_W, height: MAX_H, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 85, effort: 5 })
    .toFile(output);

  const a = (await stat(input)).size;
  const b = (await stat(output)).size;
  before += a;
  after += b;
  console.log(`${file.padEnd(28)} ${(a / 1024).toFixed(0).padStart(6)} KB -> ${(b / 1024).toFixed(0).padStart(5)} KB`);
}

console.log(`\nTotal: ${(before / 1024).toFixed(0)} KB -> ${(after / 1024).toFixed(0)} KB`);
console.log('SVG logos are not processed (they are already tiny). Keep them in Companylogos/.');
