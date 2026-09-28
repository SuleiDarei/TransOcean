import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const banned = [
  "navigating your success",
  "your trusted partner",
  "connecting the world",
  "we are committed to",
  "leading provider",
  "state-of-the-art",
  "cutting-edge",
  "seamless solutions",
  "empowering",
  "elevate",
  "unlock",
  "in today's fast-paced world",
  "world-class",
  "no.1",
  "number one",
];

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === ".next" || entry === "data") continue;
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) walk(path, files);
    else if (/\.(tsx|ts|md|mjs)$/.test(entry)) files.push(path);
  }
  return files;
}

const hits = [];
for (const file of walk("content").concat(walk("components")).concat(walk("app"))) {
  const text = readFileSync(file, "utf8").toLowerCase();
  for (const phrase of banned) {
    if (text.includes(phrase)) hits.push(`${file}: ${phrase}`);
  }
}

if (hits.length) {
  console.error(hits.join("\n"));
  process.exit(1);
}
console.log("copy check passed");
