import { lazy, Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NameTrace from "./NameTrace";
import Shots from "./Shots";
import Candles from "./Candles";
import Atmosphere from "./Atmosphere";
import Titles from "./Titles";
import Tickets from "./Tickets";
import Credits from "./Credits";
import { loadGift, saveGift } from "./storage";
import { playThud, unlockAudio } from "./sounds";
import { cueScore, onMuteChange, startScore, toggleMute } from "./score";
import "./sharanya21.css";

const MemoryBook = lazy(() => import("./MemoryBook"));

// Act slates shown on a cut into a new scene.
const SLATES = {
  trace: { numeral: "I", title: "her name" },
  shots: { numeral: "II", title: "twenty-one shots" },
  candles: { numeral: "II", title: "the wish, actually" },
  book: { numeral: "III", title: "twenty-one reasons" },
  tickets: { numeral: "IV", title: "where next" },
};
const SLATE_LENGTH = 2600;

const FONTS = "https://fonts.googleapis.com/css2?family=Birthstone+Bounce&family=Shadows+Into+Light+Two&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Josefin+Sans:wght@300;400;500&display=swap";

const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, transition: { duration: 0.8, ease: [0.4, 0, 1, 1] } },
};

const sceneStyle = { position: "absolute", inset: 0 };

if (typeof document !== "undefined" && !document.getElementById("sharanya-fonts")) {
  const early = document.createElement("link");
  early.id = "sharanya-fonts";
  early.rel = "stylesheet";
  early.href = FONTS;
  document.head.appendChild(early);
}

function SoundButton({ muted, onToggle }) {
  return (
    <button
      type="button"
      className={`s21-sound ${muted ? "is-off" : ""}`}
      aria-label={muted ? "turn the music on" : "turn the music off"}
      onClick={(event) => {
        event.stopPropagation();
        onToggle();
      }}
    >
      <span className="s21-sound-bars" aria-hidden="true">
        <i /><i /><i /><i />
      </span>
    </button>
  );
}

function Letterbox() {
  return (
    <div className="s21-letterbox" aria-hidden="true">
      <span className="s21-bar is-top" />
      <span className="s21-bar is-bottom" />
    </div>
  );
}

function Slate({ slate }) {
  return (
    <AnimatePresence>
      {slate && (
        <motion.div
          key={slate.numeral}
          className="s21-slate"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.35 } }}
          exit={{ opacity: 0, transition: { duration: 1.1, ease: [0.4, 0, 1, 1] } }}
        >
          <span className="s21-slate-numeral">{slate.numeral}</span>
          <span className="s21-slate-rule" />
          <p className="s21-slate-title">{slate.title}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function SharanyaBirthday() {
  const [gift, setGift] = useState(loadGift);
  const [muted, setMuted] = useState(false);
  const [slate, setSlate] = useState(null);

  useEffect(() => {
    document.documentElement.classList.add("sharanya-open");
    const previousTitle = document.title;
    document.title = "For Shansu";

    let fontLink = document.getElementById("sharanya-fonts");
    if (!fontLink) {
      fontLink = document.createElement("link");
      fontLink.id = "sharanya-fonts";
      fontLink.rel = "stylesheet";
      fontLink.href = FONTS;
      document.head.appendChild(fontLink);
    } else if (fontLink.href !== FONTS) {
      fontLink.href = FONTS;
    }

    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex, nofollow";
    document.head.appendChild(robots);
    const unsub = onMuteChange(setMuted);

    return () => {
      unsub();
      document.documentElement.classList.remove("sharanya-open");
      const mainEl = document.querySelector("main");
      if (mainEl) mainEl.style.background = "";
      document.title = previousTitle;
      robots.remove();
    };
  }, []);

  useEffect(() => {
    const main = document.querySelector("main");
    if (main) main.style.background = "#0b0709";
    cueScore(gift.stage);
  }, [gift.stage]);

  const advance = (stage, extra = {}) => {
    const next = saveGift({ stage, ...extra });
    const card = SLATES[stage];
    if (card && gift.stage !== stage && stage !== "titles") {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setSlate(card);
      playThud();
      window.setTimeout(() => setSlate(null), reduce ? 1200 : SLATE_LENGTH);
    }
    setGift(next);
  };

  return (
    <div
      className={`sharanya-root is-${gift.stage} ${slate ? "has-slate" : ""}`}
      onPointerDown={() => {
        unlockAudio();
        if (gift.stage !== "titles") startScore();
      }}
    >
      <Atmosphere />
      <Letterbox />
      <Slate slate={slate} />
      <SoundButton muted={muted} onToggle={() => setMuted(toggleMute())} />
      <AnimatePresence mode="wait">
        {gift.stage === "titles" && (
          <motion.div key="titles" className="s21-scene" style={sceneStyle} {...fade}>
            <Titles onComplete={() => advance("trace")} />
          </motion.div>
        )}
        {gift.stage === "trace" && (
          <motion.div key="trace" className="s21-scene" style={sceneStyle} {...fade}>
            <NameTrace onComplete={() => advance("shots")} />
          </motion.div>
        )}
        {gift.stage === "shots" && (
          <motion.div key="shots" className="s21-scene" style={sceneStyle} {...fade}>
            <Shots onComplete={() => advance("candles")} />
          </motion.div>
        )}
        {gift.stage === "candles" && (
          <motion.div key="candles" className="s21-scene" style={sceneStyle} {...fade}>
            <Candles onComplete={() => advance("book")} />
          </motion.div>
        )}
        {gift.stage === "book" && (
          <motion.div key="book" className="s21-scene" style={sceneStyle} {...fade}>
            <Suspense
              fallback={(
                <div className="s21-opening">
                  <p className="s21-smallcaps">opening the book</p>
                </div>
              )}
            >
              <MemoryBook
                initialPage={gift.page}
                initialStickers={gift.stickers}
                onPersist={(patch) => saveGift(patch)}
                onDone={() => advance("tickets")}
              />
            </Suspense>
          </motion.div>
        )}
        {gift.stage === "tickets" && (
          <motion.div key="tickets" className="s21-scene" style={sceneStyle} {...fade}>
            <Tickets
              initialRedeemed={gift.redeemed}
              onPersist={(patch) => saveGift(patch)}
              onComplete={() => advance("credits")}
            />
          </motion.div>
        )}
        {gift.stage === "credits" && (
          <motion.div key="credits" className="s21-scene" style={sceneStyle} {...fade}>
            <Credits
              onReplay={() => advance("book", { page: 0 })}
              onRestart={() => advance("titles", { page: 0 })}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
