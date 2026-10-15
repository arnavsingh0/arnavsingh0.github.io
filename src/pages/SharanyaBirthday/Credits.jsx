import { useEffect, useState } from "react";
import { credits } from "../../data/sharanya21";

const STILLS = [
  "/sharanya21/photos/iconic.webp",
  "/sharanya21/photos/vischer-return.webp",
  "/sharanya21/photos/graduation.webp",
];

export default function Credits({ onReplay, onRestart }) {
  const [still, setStill] = useState(0);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stillTimer = window.setInterval(() => {
      setStill((index) => (index + 1) % STILLS.length);
    }, 9000);
    const endTimer = window.setTimeout(() => setEnded(true), reduce ? 400 : (credits.length + 3) * 2000);
    return () => {
      window.clearInterval(stillTimer);
      window.clearTimeout(endTimer);
    };
  }, []);

  return (
    <section className={`s21-credits ${ended ? "is-ended" : ""}`}>
      <div className="s21-stills" aria-hidden="true">
        {STILLS.map((src, index) => (
          <img key={src} src={src} alt="" className={index === still ? "is-on" : ""} />
        ))}
      </div>
      <div className="s21-credits-roll">
        {credits.map((line, index) => (
          <p key={line.role} style={{ "--i": index }}>
            <span className="s21-smallcaps">{line.role}</span>
            {line.name}
          </p>
        ))}
        <p className="s21-credits-note" style={{ "--i": credits.length }}>
          no animals were harmed. one sloth was heavily featured.
        </p>
        <h2 style={{ "--i": credits.length + 1 }}>happy 21st</h2>
        <p className="s21-credits-sign" style={{ "--i": credits.length + 2 }}>i love ju. always, arnu</p>
      </div>
      <div className="s21-credits-actions" style={{ "--i": credits.length + 3 }}>
        <button type="button" className="s21-textlink" onClick={onReplay}>
          read it again
        </button>
        <button type="button" className="s21-textlink is-quiet" onClick={onRestart}>
          from the top
        </button>
      </div>
    </section>
  );
}
