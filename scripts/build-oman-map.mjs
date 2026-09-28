/**
 * Builds lib/network/oman.ts from Natural Earth 1:10m.
 * See scripts/build-oman-map.md for the mapshaper steps that produce data/oman-full2.json.
 */
import { readFileSync, writeFileSync } from "node:fs";

const source = JSON.parse(readFileSync(new URL("../data/oman-full2.json", import.meta.url), "utf8"));
const geometry = source.features[0].geometry;
const polygons = geometry.type === "MultiPolygon" ? geometry.coordinates : [geometry.coordinates];

function ringArea(ring) {
  let area = 0;
  for (let i = 0; i < ring.length - 1; i += 1) {
    area += ring[i][0] * ring[i + 1][1] - ring[i + 1][0] * ring[i][1];
  }
  return Math.abs(area / 2);
}

const exteriors = polygons
  .map((polygon) => polygon[0])
  .filter((ring) => ring.length > 40)
  .sort((a, b) => ringArea(b) - ringArea(a));

const mainland = exteriors[0];
const musandam = exteriors
  .slice(1)
  .sort((a, b) => Math.max(...b.map((p) => p[1])) - Math.max(...a.map((p) => p[1])))[0];

function perp(point, a, b) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const length = Math.hypot(dx, dy) || 1;
  return Math.abs(dy * point[0] - dx * point[1] + b[0] * a[1] - b[1] * a[0]) / length;
}

function rdp(points, epsilon) {
  if (points.length < 3) return points;
  let max = 0;
  let index = 0;
  const start = points[0];
  const end = points[points.length - 1];
  for (let i = 1; i < points.length - 1; i += 1) {
    const distance = perp(points[i], start, end);
    if (distance > max) {
      max = distance;
      index = i;
    }
  }
  if (max > epsilon) {
    const left = rdp(points.slice(0, index + 1), epsilon);
    const right = rdp(points.slice(index), epsilon);
    return left.slice(0, -1).concat(right);
  }
  return [start, end];
}

function simplifyRing(ring, epsilon) {
  const open = ring.slice(0, -1);
  let far = 1;
  let best = 0;
  for (let i = 1; i < open.length; i += 1) {
    const distance = Math.hypot(open[i][0] - open[0][0], open[i][1] - open[0][1]);
    if (distance > best) {
      best = distance;
      far = i;
    }
  }
  const first = rdp(open.slice(0, far + 1), epsilon);
  const second = rdp(open.slice(far).concat([open[0]]), epsilon);
  const simplified = first.slice(0, -1).concat(second);
  return simplified;
}

const mainlandSimple = simplifyRing(mainland, 3500);
const musandamSimple = simplifyRing(musandam, 1800);
const kept = [mainlandSimple, musandamSimple];

const all = kept.flat();
const minX = Math.min(...all.map((p) => p[0]));
const maxX = Math.max(...all.map((p) => p[0]));
const minY = Math.min(...all.map((p) => p[1]));
const maxY = Math.max(...all.map((p) => p[1]));
const pad = 90;
const width = 1000;
const scale = (width - pad * 2) / (maxX - minX);
const height = (maxY - minY) * scale + pad * 2;

function project(point) {
  return [pad + (point[0] - minX) * scale, pad + (maxY - point[1]) * scale];
}

function toPath(rings) {
  return rings
    .map((ring) =>
      ring
        .map((point, index) => {
          const [x, y] = project(point);
          return `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
        })
        .join(" ") + " Z",
    )
    .join(" ");
}

function nearest(ring, target) {
  let best = 0;
  let bestDistance = Infinity;
  ring.forEach((point, index) => {
    const distance = (point[0] - target[0]) ** 2 + (point[1] - target[1]) ** 2;
    if (distance < bestDistance) {
      bestDistance = distance;
      best = index;
    }
  });
  return best;
}

function sliceRing(ring, index, radius) {
  const open = ring.slice(0, -1);
  const count = open.length;
  const points = [];
  for (let offset = -radius; offset <= radius; offset += 1) {
    points.push(open[(index + offset + count) % count]);
  }
  return points;
}

function bounds(ring) {
  const xs = ring.map((p) => p[0]);
  const ys = ring.map((p) => p[1]);
  return {
    minX: Math.min(...xs),
    maxX: Math.max(...xs),
    minY: Math.min(...ys),
    maxY: Math.max(...ys),
  };
}

const box = bounds(mainland);
const rangeX = box.maxX - box.minX;
const rangeY = box.maxY - box.minY;

function pick(predicate, score) {
  let best = null;
  let bestScore = Infinity;
  mainland.forEach((point) => {
    if (!predicate(point)) return;
    const value = score(point);
    if (value < bestScore) {
      bestScore = value;
      best = point;
    }
  });
  return best;
}

const sampleA = pick(
  (p) => p[1] > box.minY + rangeY * 0.55,
  (p) => -p[0],
);
const sampleB = pick(
  (p) => p[1] > box.minY + rangeY * 0.7 && p[0] < box.minX + rangeX * 0.42,
  (p) => Math.abs(p[1] - (box.minY + rangeY * 0.78)),
);
const sampleC = pick(
  (p) => p[1] < box.minY + rangeY * 0.18,
  (p) => Math.abs(p[0] - (box.minX + rangeX * 0.32)) + Math.abs(p[1] - box.minY) * 0.15,
);
const sampleD = pick(
  (p) => p[1] > box.minY + rangeY * 0.32 && p[1] < box.minY + rangeY * 0.5 && p[0] > box.minX + rangeX * 0.45,
  (p) => -p[0],
);
const sampleE = musandam.reduce((best, point) => (point[0] > best[0] ? point : best), musandam[0]);

const targets = {
  "sample-a": sampleA,
  "sample-b": sampleB,
  "sample-c": sampleC,
  "sample-d": sampleD,
  "sample-e": sampleE,
};

const segments = {};
const markers = {};
for (const [id, target] of Object.entries(targets)) {
  const ring = id === "sample-e" ? musandamSimple : mainlandSimple;
  const index = nearest(ring, target);
  const stretch = sliceRing(ring, index, id === "sample-e" ? 8 : 14);
  segments[id] = stretch
    .map((point, pointIndex) => {
      const [x, y] = project(point);
      return `${pointIndex === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
  const [x, y] = project(ring[index]);
  markers[id] = { x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) };
}

const musandamBox = bounds(musandam);
const [hormuzX, hormuzY] = project([(musandamBox.minX + musandamBox.maxX) / 2, musandamBox.maxY]);
const [gulfX, gulfY] = project([box.maxX, box.minY + rangeY * 0.72]);
const [seaX, seaY] = project([box.minX + rangeX * 0.55, box.minY]);

const labels = [
  { id: "hormuz", text: "Strait of Hormuz", x: Number((hormuzX - 70).toFixed(1)), y: Number((hormuzY - 28).toFixed(1)) },
  { id: "gulf", text: "Gulf of Oman", x: Number((gulfX + 16).toFixed(1)), y: Number(gulfY.toFixed(1)) },
  { id: "arabian", text: "Arabian Sea", x: Number(seaX.toFixed(1)), y: Number((seaY + 36).toFixed(1)) },
];

const file = `/* Generated by scripts/build-oman-map.mjs from Natural Earth 1:10m. Do not edit by hand. */
export const omanMap = {
  viewBox: "0 0 ${width.toFixed(1)} ${height.toFixed(1)}",
  width: ${width.toFixed(1)},
  height: ${height.toFixed(1)},
  land: ${JSON.stringify(toPath(kept))},
  markers: ${JSON.stringify(markers, null, 2)},
  segments: ${JSON.stringify(segments, null, 2)},
  labels: ${JSON.stringify(labels, null, 2)},
} as const;
`;

writeFileSync(new URL("../lib/network/oman.ts", import.meta.url), file);
console.log("wrote lib/network/oman.ts", "viewBox", width.toFixed(1), height.toFixed(1));
console.log(markers);
console.log("land chars", toPath(kept).length);
