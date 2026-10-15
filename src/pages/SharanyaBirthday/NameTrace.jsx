import { useEffect, useRef, useState } from "react";
import { SCRIPT, drawGuide, drawNameMask, drawPaper, nameLetterEdges } from "./herCalligraphy";
import { playChime, unlockAudio } from "./sounds";

// Each letter must get its share of ink before the name counts as written,
// so she can't finish before reaching the end. Forgiving within a letter though:
// it's a gift, not a test.
const LETTER_GOAL = 0.55;
const SLACK = 7; // px of forgiveness around the bristles when counting coverage
const CELL = 8; // spatial grid for coverage lookups

/* ---------- brush model ----------
   A pointed brush: slow strokes press and widen, fast strokes lift and thin,
   down-strokes carry more belly than cross-strokes. Input is smoothed and the
   stroke is laid as overlapping round dabs along a quadratic curve, so joints
   are seamless and the line thickens and thins continuously. */
const BRUSH = {
  min: 1.6,
  max: 19,
  smoothing: 0.42, // input low-pass (higher = follows hand more closely)
  widthEase: 0.22, // how quickly width responds
  slowSpeed: 0.35, // px/ms at which the brush is fully pressed
  fastSpeed: 2.6, // px/ms at which the brush is fully lifted
};

export default function NameTrace({ onComplete }) {
  const boardRef = useRef(null);
  const guideRef = useRef(null);
  const inkRef = useRef(null);
  const pointsRef = useRef([]);
  const gridRef = useRef(new Map());
  const hitsRef = useRef(new Set());
  const lettersRef = useRef({ of: [], total: [], hit: [] }); // point → letter index, per-letter counts
  const drawing = useRef(false);
  const stroke = useRef(null); // { pts: [], width, pos, time }
  const ratioTick = useRef(0);
  const brushRef = useRef(null);
  const revealRef = useRef(1);
  const revealFrame = useRef(0);
  const scaleRef = useRef(1); // brush scale: the name shrinks on small boards, so does the brush
  const touchRef = useRef(false); // a finger hides the brush cursor; it would sit under the hand
  const done = useRef(false);
  const [ratio, setRatio] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [hint, setHint] = useState("trace the white, in jur own hand");

  useEffect(() => {
    let dead = false;
    const board = boardRef.current;
    const guide = guideRef.current;
    const ink = inkRef.current;
    if (!board || !guide || !ink) return undefined;

    const sizeCanvases = () => {
      const rect = board.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = rect.width;
      const height = rect.height;
      scaleRef.current = Math.min(1, Math.max(0.45, width / 1000));
      [guide, ink].forEach((canvas) => {
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        const context = canvas.getContext("2d");
        context.setTransform(dpr, 0, 0, dpr, 0, 0);
        context.clearRect(0, 0, width, height);
      });
      return { width, height, dpr };
    };

    const paintGuide = (reveal) => {
      const rect = board.getBoundingClientRect();
      const dpr = guide.width / rect.width || 1;
      const width = rect.width;
      const height = rect.height;
      const guideCtx = guide.getContext("2d");
      guideCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      guideCtx.clearRect(0, 0, width, height);
      drawPaper(guideCtx, width, height);
      guideCtx.save();
      guideCtx.beginPath();
      guideCtx.rect(0, 0, Math.max(0, width * reveal), height);
      guideCtx.clip();
      drawGuide(guideCtx, width, height);
      guideCtx.restore();
    };

    const paint = (reveal = revealRef.current) => {
      if (dead || done.current) return;
      const { width, height, dpr } = sizeCanvases();
      paintGuide(reveal);

      const sample = document.createElement("canvas");
      sample.width = guide.width;
      sample.height = guide.height;
      const sampleCtx = sample.getContext("2d");
      sampleCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawNameMask(sampleCtx, width, height);
      const pixels = sampleCtx.getImageData(0, 0, sample.width, sample.height).data;
      const points = [];
      const step = Math.max(4, Math.round(4 * dpr));
      for (let y = 0; y < sample.height; y += step) {
        for (let x = 0; x < sample.width; x += step) {
          if (pixels[(y * sample.width + x) * 4 + 3] > 140) {
            points.push({ x: x / dpr, y: y / dpr });
          }
        }
      }
      pointsRef.current = points;
      const grid = new Map();
      const edges = nameLetterEdges(sampleCtx, width, height);
      const of = new Array(points.length);
      const total = new Array(edges.length).fill(0);
      points.forEach((point, index) => {
        const key = `${Math.floor(point.x / CELL)},${Math.floor(point.y / CELL)}`;
        if (!grid.has(key)) grid.set(key, []);
        grid.get(key).push(index);
        let letter = edges.findIndex((edge) => point.x < edge);
        if (letter < 0) letter = edges.length - 1;
        of[index] = letter;
        total[letter] += 1;
      });
      gridRef.current = grid;
      hitsRef.current = new Set();
      lettersRef.current = { of, total, hit: new Array(edges.length).fill(0) };
    };

    const writeIn = () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        revealRef.current = 1;
        paint(1);
        return;
      }
      revealRef.current = 0;
      paint(0);
      const started = performance.now();
      const step = (now) => {
        if (dead || done.current) return;
        const t = Math.min(1, (now - started) / 2800);
        const eased = 1 - (1 - t) ** 3;
        revealRef.current = eased;
        paintGuide(eased);
        if (t < 1) revealFrame.current = requestAnimationFrame(step);
      };
      revealFrame.current = requestAnimationFrame(step);
    };

    const start = async () => {
      const link = document.getElementById("sharanya-fonts");
      if (link && !link.sheet) {
        await new Promise((resolve) => {
          link.addEventListener("load", resolve, { once: true });
          window.setTimeout(resolve, 1800);
        });
      }
      for (let attempt = 0; attempt < 30 && !dead; attempt += 1) {
        try {
          await document.fonts.load(`160px '${SCRIPT}'`);
          await document.fonts.load('20px "Playfair Display"');
        } catch {
          /* try again until the sheet arrives */
        }
        if (document.fonts.check(`160px '${SCRIPT}'`)) break;
        await new Promise((resolve) => window.setTimeout(resolve, 60));
      }
      if (!dead) writeIn();
    };
    start();

    const observer = new ResizeObserver(() => {
      if (!done.current) paint(revealRef.current);
    });
    observer.observe(board);
    return () => {
      dead = true;
      if (revealFrame.current) cancelAnimationFrame(revealFrame.current);
      observer.disconnect();
    };
  }, []);

  const finish = () => {
    if (done.current) return;
    done.current = true;
    setRatio(1);
    setLeaving(true);
    // the "security check", very serious
    setHint("checking the handwriting…");
    window.setTimeout(() => setHint("checking… still checking…"), 1100);
    window.setTimeout(() => {
      setHint("✓ yep. that's my Shansu. come in.");
      playChime();
    }, 2200);
    window.setTimeout(onComplete, 4600);
  };

  // Mark guide points under a dab as covered. Grid lookup keeps this cheap.
  const cover = (x, y, radius) => {
    const points = pointsRef.current;
    const grid = gridRef.current;
    const hits = hitsRef.current;
    // a halo around the bristles counts too: near the line is on the line
    const r = radius * 1.4 + SLACK * scaleRef.current;
    const minCx = Math.floor((x - r) / CELL);
    const maxCx = Math.floor((x + r) / CELL);
    const minCy = Math.floor((y - r) / CELL);
    const maxCy = Math.floor((y + r) / CELL);
    for (let cy = minCy; cy <= maxCy; cy += 1) {
      for (let cx = minCx; cx <= maxCx; cx += 1) {
        const bucket = grid.get(`${cx},${cy}`);
        if (!bucket) continue;
        for (let i = 0; i < bucket.length; i += 1) {
          const index = bucket[i];
          if (hits.has(index)) continue;
          const point = points[index];
          if ((point.x - x) ** 2 + (point.y - y) ** 2 <= r * r) {
            hits.add(index);
            const letters = lettersRef.current;
            letters.hit[letters.of[index]] += 1;
          }
        }
      }
    }
  };

  const report = (force) => {
    if (done.current) return;
    // progress is the average of how finished each letter is, capped per letter,
    // so the bar only fills once the last letter has its ink
    const { total, hit } = lettersRef.current;
    if (!total.length) return;
    let sum = 0;
    for (let i = 0; i < total.length; i += 1) {
      sum += Math.min(1, hit[i] / Math.max(1, total[i]) / LETTER_GOAL);
    }
    const covered = sum / total.length;
    const now = performance.now();
    if (force || now - ratioTick.current > 90) {
      ratioTick.current = now;
      setRatio(covered);
      if (covered > 0.45 && covered < 0.8) setHint("keep going, Shansu");
      if (covered >= 0.8 && covered < 1) setHint("so close");
    }
    if (covered >= 0.999) finish();
  };

  // One round dab of ink: a soft outer edge and a dense core.
  const dab = (ctx, x, y, width, alpha) => {
    const radius = Math.max(0.5, width / 2);
    ctx.globalAlpha = alpha * 0.35;
    ctx.beginPath();
    ctx.arc(x, y, radius * 1.18, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    cover(x, y, radius);
  };

  // Lay ink along a quadratic curve from `a` to `b` bent by control `c`,
  // interpolating width so the line swells and thins without seams.
  const laySegment = (a, c, b, widthFrom, widthTo, alpha) => {
    const ctx = inkRef.current.getContext("2d");
    ctx.fillStyle = "#fffcf8";
    const approx = Math.hypot(b.x - a.x, b.y - a.y) + Math.hypot(c.x - a.x, c.y - a.y) * 0.25;
    const step = Math.max(0.9, Math.min(widthFrom, widthTo) * 0.22);
    const count = Math.max(1, Math.ceil(approx / step));
    for (let i = 1; i <= count; i += 1) {
      const t = i / count;
      const u = 1 - t;
      const x = u * u * a.x + 2 * u * t * c.x + t * t * b.x;
      const y = u * u * a.y + 2 * u * t * c.y + t * t * b.y;
      dab(ctx, x, y, widthFrom + (widthTo - widthFrom) * t, alpha);
    }
    ctx.globalAlpha = 1;
  };

  const targetWidth = (vx, vy, speed) => {
    const lift = Math.min(1, Math.max(0, (speed - BRUSH.slowSpeed) / (BRUSH.fastSpeed - BRUSH.slowSpeed)));
    const press = 1 - lift * lift;
    const len = Math.hypot(vx, vy) || 1;
    const down = Math.max(0, vy / len);
    const belly = 0.55 + down * 0.45; // down-strokes carry the most ink
    const k = scaleRef.current;
    return (BRUSH.min + (BRUSH.max - BRUSH.min) * press * belly) * k;
  };

  const moveBrush = (point, angle) => {
    const brush = brushRef.current;
    if (!brush) return;
    brush.style.opacity = touchRef.current ? "0" : "1";
    brush.style.transform = `translate(${point.x - 18}px, ${point.y - 102}px) rotate(${angle}rad)`;
  };

  const pointFromEvent = (event) => {
    const rect = inkRef.current.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      t: event.timeStamp || performance.now(),
    };
  };

  // Feed one smoothed input sample into the current stroke.
  const feed = (raw) => {
    const s = stroke.current;
    if (!s) return;
    const prev = s.pos;
    const k = BRUSH.smoothing;
    const pos = {
      x: prev.x + (raw.x - prev.x) * k,
      y: prev.y + (raw.y - prev.y) * k,
    };
    const scale = scaleRef.current;
    const dt = Math.max(4, raw.t - s.time);
    const dx = pos.x - prev.x;
    const dy = pos.y - prev.y;
    const dist = Math.hypot(dx, dy);
    if (dist < 0.35) return;
    // speed is measured relative to the board, so a small screen isn't "fast"
    const speed = dist / dt / scale;
    s.speed += (speed - s.speed) * 0.3;

    // the brush tip trails slightly, so entry strokes start thin and build
    s.age += dist;
    const entry = Math.min(1, s.age / (26 * scale));
    const want = targetWidth(dx, dy, s.speed) * (0.35 + 0.65 * entry);
    const ease = BRUSH.widthEase * Math.min(1.6, dist / 2);
    const width = s.width + (want - s.width) * Math.min(1, ease);
    const alpha = 0.78 + 0.22 * (1 - Math.min(1, s.speed / BRUSH.fastSpeed));

    // quadratic through the midpoints: smooth joints between samples
    const mid = { x: (prev.x + pos.x) / 2, y: (prev.y + pos.y) / 2 };
    if (s.lastMid) {
      laySegment(s.lastMid, prev, mid, s.width, width, alpha);
    } else {
      laySegment(prev, prev, mid, s.width, width, alpha);
    }
    s.lastMid = mid;
    s.pos = pos;
    s.time = raw.t;
    s.width = width;
    s.dir = { x: dx / dist, y: dy / dist };
    moveBrush(pos, Math.atan2(dx, dy) || 0);
    report(false);
  };

  const onPointerDown = (event) => {
    if (done.current) return;
    touchRef.current = event.pointerType === "touch";
    unlockAudio();
    try {
      inkRef.current.setPointerCapture(event.pointerId);
    } catch {
      /* pointer capture needs a real press; drawing still works */
    }
    drawing.current = true;
    const p = pointFromEvent(event);
    const k = scaleRef.current;
    stroke.current = {
      pos: p,
      time: p.t,
      width: BRUSH.min * 1.4 * k,
      speed: 0,
      age: 0,
      lastMid: null,
      dir: { x: 0.3, y: 1 },
    };
    moveBrush(p, -0.35);
    const ctx = inkRef.current.getContext("2d");
    ctx.fillStyle = "#fffcf8";
    dab(ctx, p.x, p.y, BRUSH.min * 1.6 * k, 0.9);
    ctx.globalAlpha = 1;
  };

  const onPointerMove = (event) => {
    if (!drawing.current) touchRef.current = event.pointerType === "touch";
    if (!drawing.current || done.current) {
      const p = pointFromEvent(event);
      moveBrush(p, -0.35);
      return;
    }
    const samples = typeof event.nativeEvent?.getCoalescedEvents === "function"
      ? event.nativeEvent.getCoalescedEvents()
      : [];
    if (samples.length > 1) {
      samples.forEach((sample) => feed(pointFromEvent(sample)));
    } else {
      feed(pointFromEvent(event));
    }
  };

  const onPointerUp = () => {
    const s = stroke.current;
    if (drawing.current && s) {
      // lift the brush: a tapering tail along the last direction
      const length = 6 * scaleRef.current + s.width * 1.1;
      const tip = {
        x: s.pos.x + s.dir.x * length,
        y: s.pos.y + s.dir.y * length,
      };
      const bend = {
        x: s.pos.x + s.dir.x * length * 0.5 - s.dir.y * s.width * 0.25,
        y: s.pos.y + s.dir.y * length * 0.5 + s.dir.x * s.width * 0.25,
      };
      laySegment(s.pos, bend, tip, s.width, 0.4, 0.85);
      report(true);
    }
    drawing.current = false;
    stroke.current = null;
  };

  const hideBrush = () => {
    if (brushRef.current) brushRef.current.style.opacity = "0";
  };

  return (
    <section className={`s21-stage s21-trace-stage ${leaving ? "is-leaving" : ""}`}>
      <div className="s21-trace-card">
        <p className="s21-smallcaps s21-trace-eyebrow">scene one</p>
        <h1 className="s21-invite-title">write your name, Shansu</h1>
        <p className="s21-trace-note">gotta make sure its actually u</p>
        <div
          ref={boardRef}
          className={`s21-trace-board ${leaving ? "is-done" : ""}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onPointerLeave={hideBrush}
        >
          <canvas ref={guideRef} />
          <canvas ref={inkRef} className={leaving ? "is-bloom" : ""} />
          <div ref={brushRef} className="s21-brush" aria-hidden="true">
            <svg viewBox="0 0 40 160">
              <rect x="16" y="2" width="8" height="78" rx="3" fill="#b57a48" />
              <rect x="16" y="2" width="3" height="78" rx="2" fill="#e2b07a" opacity="0.55" />
              <rect x="13" y="78" width="14" height="16" rx="1" fill="#e4d2b0" />
              <path d="M13 94c-1 22 4 42 7 62 3-20 8-40 7-62z" fill="#2c211c" />
              <path d="M18 96c0 18 1 36 2 56 1-20 2-38 2-56z" fill="#7a5c48" />
            </svg>
          </div>
        </div>
        <div className="s21-trace-progress" aria-hidden="true">
          <span style={{ width: `${Math.round(ratio * 100)}%` }} />
        </div>
        <p className="s21-hint">{hint}</p>
      </div>
    </section>
  );
}
