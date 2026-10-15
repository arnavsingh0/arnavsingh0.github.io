import { execFile } from "node:child_process";
import { mkdir, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const execFileAsync = promisify(execFile);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir = path.resolve(root, "../4year/public/photos");
const outDir = path.join(root, "public/sharanya21/photos");
const tmpDir = path.join(outDir, ".tmp");

const photos = [
  ["pickup", "IMG_6994 2.jpg"],
  ["prom-dress", "IMG_5404.JPG"],
  ["prom-together", "IMG_5391.JPG"],
  ["vischer-kiss", "IMG_5450.JPG"],
  ["vischer-return", "IMG_4625.JPG"],
  ["photobooth", "IMG_6076.JPG"],
  ["kayak", "IMG_6147.JPG"],
  ["canoe", "IMG_3864.JPG"],
  ["south-station", "IMG_6414 2.JPG"],
  ["homecoming", "IMG_7266.JPG"],
  ["marathon", "IMG_8603.JPG"],
  ["iconic", "P1030683_Original.jpg"],
  ["killy", "IMG_0619.JPG"],
  ["killy-peace", "IMG_0621.JPG"],
  ["gile", "IMG_0796.JPG"],
  ["newport", "IMG_1232.JPG"],
  ["valentines", "IMG_1663.JPG"],
  ["aquarium", "IMG_2742.JPG"],
  ["holi", "IMG_0906.HEIC"],
  ["anniversary", "IMG_3244 2.JPEG"],
  ["cheepsu", "IMG_3818.JPG"],
  ["cheepsu-happy", "lp_image 2.HEIC"],
  ["flume", "IMG_4235.JPG"],
  ["flatbread", "IMG_1027.JPG"],
  ["landwer", "IMG_4547.JPG"],
  ["stargirl", "IMG_9020.JPG"],
  ["scrubs", "IMG_2547.JPG"],
  ["bouquet", "IMG_2552.JPG"],
  ["cancun", "IMG_2973.JPG"],
  ["cancun-sun", "DSC04453_Original.jpg"],
  ["graduation", "IMG_8229.PNG"],
];

const converter = path.join(tmpDir, "heic-to-jpeg");

async function readableInput(id, filename) {
  const source = path.join(sourceDir, filename);
  if (!filename.toLowerCase().endsWith(".heic")) return source;
  const jpeg = path.join(tmpDir, `${id}.jpg`);
  await execFileAsync(converter, [source, jpeg]);
  return jpeg;
}

await mkdir(tmpDir, { recursive: true });
await execFileAsync("swiftc", [
  "-O",
  path.join(root, "scripts/heic-to-jpeg.swift"),
  "-o",
  converter,
]);

for (const [id, filename] of photos) {
  const input = await readableInput(id, filename);
  const out = path.join(outDir, `${id}.webp`);
  await sharp(input)
    .rotate()
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 76 })
    .toFile(out);
  const stat = await sharp(out).metadata();
  console.log(`${id}.webp ${stat.width}x${stat.height}`);
}

await rm(tmpDir, { recursive: true, force: true });
console.log(`wrote ${photos.length} photos to ${outDir}`);

if (os.platform() !== "darwin") {
  console.warn("HEIC conversion uses macOS sips. Run this on a Mac.");
}
