import { createCanvas } from "canvas";
import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function generate(size, outPath) {
  const c = createCanvas(size, size);
  const ctx = c.getContext("2d");
  const r = size * 0.1875; // corner radius

  // rounded rect background
  ctx.beginPath();
  ctx.moveTo(r, 0);
  ctx.lineTo(size - r, 0);
  ctx.quadraticCurveTo(size, 0, size, r);
  ctx.lineTo(size, size - r);
  ctx.quadraticCurveTo(size, size, size - r, size);
  ctx.lineTo(r, size);
  ctx.quadraticCurveTo(0, size, 0, size - r);
  ctx.lineTo(0, r);
  ctx.quadraticCurveTo(0, 0, r, 0);
  ctx.closePath();
  ctx.fillStyle = "#ff6b6b";
  ctx.fill();

  // text
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#fff";
  ctx.font = `900 ${size * 0.31}px sans-serif`;
  ctx.fillText("9", size / 2, size * 0.28);
  ctx.fillStyle = "#ffe066";
  ctx.font = `900 ${size * 0.16}px sans-serif`;
  ctx.fillText("×", size / 2, size * 0.52);
  ctx.fillStyle = "#fff";
  ctx.font = `900 ${size * 0.31}px sans-serif`;
  ctx.fillText("9", size / 2, size * 0.76);

  writeFileSync(outPath, c.toBuffer("image/png"));
  console.log(`Created ${outPath}`);
}

const publicDir = resolve(__dirname, "../public");
generate(192, resolve(publicDir, "icon-192.png"));
generate(512, resolve(publicDir, "icon-512.png"));
