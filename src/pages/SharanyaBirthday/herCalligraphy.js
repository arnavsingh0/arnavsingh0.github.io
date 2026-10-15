const LINE = 32;

function xy(point) {
  return Array.isArray(point) ? { x: point[0], y: point[1] } : point;
}

function smooth(points, per = 7) {
  if (points.length < 2) return points.map(xy);
  const out = [];
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = xy(points[Math.max(0, i - 1)]);
    const p1 = xy(points[i]);
    const p2 = xy(points[i + 1]);
    const p3 = xy(points[Math.min(points.length - 1, i + 2)]);
    for (let s = 0; s < per; s += 1) {
      const t = s / per;
      const t2 = t * t;
      const t3 = t2 * t;
      out.push({
        x: 0.5 * (2 * p1.x + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
        y: 0.5 * (2 * p1.y + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
      });
    }
  }
  out.push(xy(points[points.length - 1]));
  return out;
}

export const SCRIPT = "Birthstone Bounce";

function traceLine(ctx, points) {
  const pts = smooth(points, 8);
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  pts.slice(1).forEach((point) => ctx.lineTo(point.x, point.y));
  ctx.stroke();
}

function petal(ctx, cx, cy, angle, len) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(0, 3);
  ctx.bezierCurveTo(8, -8, 7, -len + 6, 0, -len);
  ctx.bezierCurveTo(-7, -len + 6, -8, -8, 0, 3);
  ctx.stroke();
  ctx.restore();
}

function leaf(ctx, x, y, rot, len) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(10, -8, len - 6, -12, len, 0);
  ctx.bezierCurveTo(len - 8, 9, 8, 7, 0, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(3, 0);
  ctx.quadraticCurveTo(len * 0.55, -2, len - 3, 0);
  ctx.stroke();
  ctx.restore();
}

function drawFlourish(ctx) {
  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.92)";
  ctx.fillStyle = "rgba(255,255,255,0.92)";
  ctx.lineWidth = 2.4;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const cx = -132;
  const cy = -58;
  for (let i = 0; i < 5; i += 1) {
    petal(ctx, cx, cy, -Math.PI / 2 + (i * Math.PI * 2) / 5, 34);
  }
  for (let i = 0; i < 5; i += 1) {
    petal(ctx, cx, cy, -Math.PI / 2 + (i * Math.PI * 2) / 5 + 0.32, 16);
  }
  ctx.beginPath();
  ctx.arc(cx, cy, 5.5, 0, Math.PI * 2);
  ctx.stroke();

  leaf(ctx, cx + 26, cy - 38, -0.55, 40);
  leaf(ctx, cx - 38, cy - 22, 2.5, 30);
  leaf(ctx, cx + 22, cy + 36, 0.4, 32);
  leaf(ctx, cx - 8, cy - 48, -1.2, 22);

  traceLine(ctx, [
    [cx + 6, cy + 24],
    [cx - 16, cy + 70],
    [cx + 8, cy + 118],
    [cx - 22, cy + 156],
  ]);

  ctx.beginPath();
  const sx = cx - 8;
  const sy = cy + 176;
  for (let i = 0; i <= 36; i += 1) {
    const t = i / 36;
    const angle = t * Math.PI * 3.1;
    const radius = 3 + t * 15;
    const x = sx + Math.cos(angle) * radius;
    const y = sy + Math.sin(angle) * radius * 0.82;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  [
    [sx + 6, sy + 28],
    [sx + 14, sy + 46],
    [sx + 20, sy + 60],
    [sx + 24, sy + 72],
  ].forEach(([x, y], index) => {
    ctx.beginPath();
    ctx.arc(x, y, 2.4 - index * 0.4, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

const NAME = "Sharanya";
// how far the flourish's spiral + dots reach below the baseline, in 168px units
const FLOURISH_BOTTOM = 194;

// Where the word sits on a board of this size: font size, left edge, baseline.
function layout(ctx, width, height) {
  ctx.save();
  ctx.textBaseline = "alphabetic";
  // size the word so the flourish + name always fit the board with a margin
  let size = Math.min(width * 0.22, height * 0.34, 168);
  let metrics;
  let rightInk;
  let flourishW;
  let block;
  const measure = () => {
    ctx.font = `${size}px "${SCRIPT}", cursive`;
    metrics = ctx.measureText(NAME);
    rightInk = Math.max(metrics.width, metrics.actualBoundingBoxRight || metrics.width);
    flourishW = size * 1.22;
    block = flourishW + rightInk + size * 0.12;
  };
  measure();
  const room = width - 28;
  if (block > room) {
    size *= room / block;
    measure();
  }
  const left = Math.max(12, (width - block) / 2);
  // centre the word's ink (ascenders to descenders) on the board, snapped to a rule
  const ascent = metrics.actualBoundingBoxAscent || size * 0.75;
  const descent = metrics.actualBoundingBoxDescent || size * 0.3;
  const baseline = Math.round((height / 2 + (ascent - descent) / 2) / LINE) * LINE;
  // the flourish trails well below the baseline; shrink it if the board is short
  const flourishDrop = (FLOURISH_BOTTOM * size) / 168;
  const flourishScale = Math.min(1, Math.max(0.6, (height - 14 - baseline) / flourishDrop));
  ctx.restore();
  return { size, wordX: left + flourishW, baseline, flourishScale };
}

// x positions where each letter of the name ends, so tracing can be judged
// letter by letter instead of as one big pool of ink.
export function nameLetterEdges(ctx, width, height) {
  const { size, wordX } = layout(ctx, width, height);
  ctx.save();
  ctx.font = `${size}px "${SCRIPT}", cursive`;
  const edges = [];
  for (let i = 1; i <= NAME.length; i += 1) {
    edges.push(wordX + ctx.measureText(NAME.slice(0, i)).width);
  }
  ctx.restore();
  return edges;
}

function paintPiece(ctx, width, height, nameColor) {
  const text = NAME;
  const { size, wordX, baseline, flourishScale } = layout(ctx, width, height);
  ctx.save();
  ctx.textBaseline = "alphabetic";

  if (nameColor !== "#000") {
    ctx.save();
    const unit = (size / 168) * flourishScale;
    ctx.translate(wordX - size * 0.06, baseline - size * 0.02);
    ctx.scale(unit, unit);
    drawFlourish(ctx);
    ctx.restore();
  }

  ctx.font = `${size}px "${SCRIPT}", cursive`;
  ctx.lineWidth = Math.max(1.1, size * 0.018);
  ctx.strokeStyle = nameColor;
  ctx.fillStyle = nameColor;
  ctx.lineJoin = "round";
  ctx.strokeText(text, wordX, baseline);
  ctx.fillText(text, wordX, baseline);
  ctx.restore();
}

export function drawPaper(ctx, width, height) {
  const wash = ctx.createLinearGradient(0, 0, 0, height);
  wash.addColorStop(0, "#847a71");
  wash.addColorStop(1, "#6c625b");
  ctx.fillStyle = wash;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(255,255,255,0.4)";
  ctx.lineWidth = 1;
  for (let y = LINE; y < height; y += LINE) {
    ctx.beginPath();
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(width, y + 0.5);
    ctx.stroke();
  }

  // Paper tooth: a deterministic scatter of pale and dark specks.
  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const specks = Math.round((width * height) / 700);
  for (let i = 0; i < specks; i += 1) {
    const x = rand() * width;
    const y = rand() * height;
    const light = rand() > 0.5;
    ctx.fillStyle = light ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)";
    ctx.fillRect(x, y, 1 + rand() * 1.2, 1);
  }

  // Lamp falloff: brighter where she writes, darker at the edges.
  const shade = ctx.createRadialGradient(width * 0.5, height * 0.5, width * 0.12, width * 0.5, height * 0.5, width * 0.74);
  shade.addColorStop(0, "rgba(255,246,232,0.06)");
  shade.addColorStop(0.55, "rgba(0,0,0,0)");
  shade.addColorStop(1, "rgba(0,0,0,0.28)");
  ctx.fillStyle = shade;
  ctx.fillRect(0, 0, width, height);
}

export function drawGuide(ctx, width, height) {
  paintPiece(ctx, width, height, "rgba(255,255,255,0.9)");
}

export function drawNameMask(ctx, width, height) {
  paintPiece(ctx, width, height, "#000");
}
