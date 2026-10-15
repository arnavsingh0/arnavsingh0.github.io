import { useEffect, useRef, useState } from "react";
import { playPop, playThud, unlockAudio } from "./sounds";

// The prank before the candles: twenty-one shots lined up on a tray.
// She gets a few in, the room starts to sway, and then... jk.

const LINES = [
  "ju're legal now. one for every year. tap a glass, cutessuu.",
  "okay. twenty to go.",
  "ju good?",
  "...Shansu. slow down.",
];
const JK_AT = 4;
const COUNT = 21;

export default function Shots({ onComplete }) {
  const [taken, setTaken] = useState([]);
  const [phase, setPhase] = useState("pour"); // pour | jk
  const done = useRef(false);

  useEffect(() => {
    if (taken.length < JK_AT || done.current) return undefined;
    done.current = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveal = window.setTimeout(() => {
      setPhase("jk");
      playThud();
    }, 900);
    const leave = window.setTimeout(onComplete, reduce ? 3200 : 4600);
    return () => {
      window.clearTimeout(reveal);
      window.clearTimeout(leave);
    };
  }, [taken.length, onComplete]);

  const drink = (index) => {
    unlockAudio();
    if (done.current || taken.includes(index)) return;
    playPop();
    setTaken((list) => [...list, index]);
  };

  const count = taken.length;
  const tipsy = Math.min(count, 3);

  return (
    <section className={`s21-stage s21-shots-stage is-${phase} is-tipsy-${tipsy}`}>
      <div className="s21-shots-card">
        <p className="s21-smallcaps s21-shots-eyebrow">before the candles</p>
        <h1 className="s21-shots-title">twenty-one shots</h1>
        <p className="s21-shots-line">{LINES[Math.min(count, LINES.length - 1)]}</p>
        <div className="s21-shot-tray" role="group" aria-label="twenty-one shot glasses">
          {Array.from({ length: COUNT }, (_, index) => {
            const empty = taken.includes(index);
            return (
              <button
                key={index}
                type="button"
                className={`s21-shot ${empty ? "is-empty" : ""}`}
                onClick={() => drink(index)}
                disabled={empty}
                aria-label={empty ? `shot ${index + 1}, gone` : `shot ${index + 1}`}
              >
                <span className="s21-shot-glass" aria-hidden="true">
                  <span className="s21-shot-pour" />
                </span>
              </button>
            );
          })}
        </div>
        <p className="s21-smallcaps s21-shots-count">{count} of {COUNT}</p>
      </div>

      {phase === "jk" && (
        <div className="s21-jk" role="status">
          <p className="s21-jk-word">jk.</p>
          <p className="s21-jk-line">put it down, Shansu. ju have candles to blow.</p>
        </div>
      )}
    </section>
  );
}
