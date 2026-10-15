import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { extras } from "../../data/sharanya21";
import { playPop, unlockAudio } from "./sounds";

/* The sloth. Heavily featured. It hangs around the edges of the desk, moves
   perch every few page turns (slowly), says the odd thing in the margin, and
   falls asleep if she takes too long. Tap it. */

const SLEEP_AFTER = 20000;
const MOVE_COOLDOWN = 7000;
const TRAVEL = 3.4; // seconds, because sloth

const pick = (list) => list[Math.floor(Math.random() * list.length)];

// Where it can sit, given the book's on-screen box. Sitting perches rest on
// the desk beside the book; hanging perches dangle from the top of the screen.
function perches(book, width, height) {
  const phone = width < 860;
  const size = phone ? 60 : Math.round(Math.min(96, Math.max(64, width * 0.05)));
  const tall = size * 1.28;
  const gap = 18;
  const spots = [];

  if (phone) {
    // above the page, clear of the dock (top-left) and the sound button (top-right)
    spots.push({ id: "hang", x: width / 2 - size / 2, y: -8, hang: true });
    spots.push({ id: "shelf", x: width - size - 10, y: Math.max(62, book.top - tall - 6), hang: false });
    // below the page, if the nav leaves room
    if (book.bottom + 8 + tall < height - 96) {
      spots.push({ id: "desk", x: 12, y: book.bottom + 6, hang: false, flip: true, tilt: 4 });
    }
  } else {
    const leftRoom = book.left - gap - 8;
    const rightRoom = width - book.right - gap - 8;
    if (leftRoom >= size) {
      // sitting on the desk by the bottom corner
      spots.push({ id: "desk-left", x: book.left - gap - size, y: book.bottom - tall + 6, hang: false });
    }
    if (leftRoom >= size * 0.5) {
      // clinging to the edge of the left page
      spots.push({ id: "side-left", x: book.left - size * 0.6, y: book.top + book.height * 0.12, hang: false, tilt: -9 });
    }
    // the sticker dock lives bottom-right, so the right side only gets the high perch
    if (rightRoom >= size * 0.5) {
      spots.push({ id: "side-right", x: book.right - size * 0.4, y: book.top + book.height * 0.12, hang: false, flip: true, tilt: 9 });
    }
    spots.push({ id: "hang", x: book.left + book.width / 2 - size / 2, y: -10, hang: true });
    if (leftRoom < size && rightRoom < size) {
      spots.push({ id: "hang-right", x: book.right - size * 0.7, y: -10, hang: true });
    }
  }
  return { size, tall, spots };
}

export default function Sloth({ rootRef, page, kind, reasonId, orientation }) {
  const [layout, setLayout] = useState(null);
  const [perch, setPerch] = useState(0);
  const [mood, setMood] = useState("idle"); // idle | peek | excited | wave | sleep | moving
  const [bubble, setBubble] = useState(null);
  const reduce = useRef(
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  ).current;
  const lastMove = useRef(0);
  const lastTouch = useRef(Date.now());
  const timers = useRef({});
  const flips = useRef(0);
  const mounted = useRef(false);

  const later = useCallback((key, fn, ms) => {
    window.clearTimeout(timers.current[key]);
    timers.current[key] = window.setTimeout(fn, ms);
  }, []);

  const measure = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    // in landscape the block is the open spread; in portrait it fills the slot,
    // so measure a page instead to find where the paper actually is
    const portrait = window.innerWidth < 860;
    const visiblePage = portrait
      && [...root.querySelectorAll(".stf__item")].find((el) => el.getBoundingClientRect().width > 40);
    const book = visiblePage || root.querySelector(".stf__block") || root;
    const rect = book.getBoundingClientRect();
    if (rect.width < 40) return;
    setLayout(perches(rect, window.innerWidth, window.innerHeight));
  }, [rootRef]);

  useEffect(() => {
    const ids = [120, 1900].map((ms) => window.setTimeout(measure, ms));
    window.addEventListener("resize", measure);
    return () => {
      ids.forEach((id) => window.clearTimeout(id));
      window.removeEventListener("resize", measure);
    };
  }, [measure, orientation]);

  useEffect(() => () => Object.values(timers.current).forEach((id) => window.clearTimeout(id)), []);

  const say = useCallback((text, ms = 3200) => {
    setBubble(text);
    later("bubble", () => setBubble(null), ms);
  }, [later]);

  const wake = useCallback(() => {
    lastTouch.current = Date.now();
    later("sleep", () => {
      setMood("sleep");
      setBubble(extras.sloth.sleepy);
    }, SLEEP_AFTER);
  }, [later]);

  // stay awake while she's reading, drift off when she isn't
  useEffect(() => {
    wake();
  }, [wake]);

  const settle = (ms) => later("mood", () => setMood("idle"), ms);

  const wander = useCallback(() => {
    if (!layout || layout.spots.length < 2 || reduce) return false;
    if (Date.now() - lastMove.current < MOVE_COOLDOWN) return false;
    const options = layout.spots.map((_, index) => index).filter((index) => index !== perch);
    const next = pick(options);
    lastMove.current = Date.now();
    setBubble(null);
    setMood("moving");
    setPerch(next);
    later("mood", () => setMood("idle"), TRAVEL * 1000 + 100);
    return true;
  }, [layout, perch, reduce, later]);

  // if the window changed shape and the perch no longer exists, hop home
  useEffect(() => {
    if (layout && perch >= layout.spots.length) setPerch(0);
  }, [layout, perch]);

  // page turns: peek, maybe comment, occasionally move
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    wake();
    flips.current += 1;
    if (mood === "sleep") setBubble(null);

    const lines = extras.sloth;
    let line = null;
    if (kind === "chapter") line = pick(lines.chapter);
    else if (kind === "text" && reasonId === 21) line = lines.pages.letter;
    else if (kind === "back") line = lines.pages.back;

    if (kind === "chapter") {
      setMood("excited");
      settle(1700);
    } else if (!(flips.current % 3 === 0 && wander())) {
      setMood("peek");
      settle(1200);
    }
    if (line) later("line", () => say(line, 3600), kind === "chapter" ? 300 : 900);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // a word on the cover, once the book has settled in
  useEffect(() => {
    if (kind === "cover" && page === 0) later("line", () => say(extras.sloth.pages.cover, 3600), 3200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tap = (event) => {
    event.stopPropagation();
    unlockAudio();
    playPop();
    wake();
    setMood("wave");
    settle(950);
    say(pick(extras.sloth.tap), 2800);
  };

  if (!layout) return null;
  const spot = layout.spots[Math.min(perch, layout.spots.length - 1)];
  const { size, tall } = layout;
  const bubbleX = spot.x + size / 2;
  const bubbleY = spot.hang ? spot.y + tall + 10 : spot.y - 8;

  return (
    <div className="s21-sloth-layer" aria-hidden={false}>
      <motion.button
        type="button"
        className="s21-sloth"
        style={{ "--s": `${size}px` }}
        initial={false}
        animate={{ x: spot.x, y: spot.y, rotate: spot.hang ? 180 : spot.tilt || 0, scaleX: spot.flip ? -1 : 1 }}
        transition={{ duration: reduce ? 0 : TRAVEL, ease: [0.45, 0, 0.55, 1] }}
        onClick={tap}
        aria-label="the sloth. tap to say hi"
      >
        <span className={`s21-sloth-body is-${mood}`}>
          <img src="/sharanya21/stickers/sloth.webp" alt="" draggable="false" />
        </span>
      </motion.button>
      <AnimatePresence>
        {bubble && mood !== "moving" && (
          <motion.p
            key={`${bubble}-${perch}`}
            className={`s21-sloth-bubble ${spot.hang ? "is-below" : ""} ${mood === "sleep" ? "is-zzz" : ""}`}
            style={{ left: bubbleX, top: bubbleY }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {bubble}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
