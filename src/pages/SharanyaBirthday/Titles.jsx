import { useEffect, useRef, useState } from "react";
import { startScore } from "./score";
import { playThud, playTick, startProjector, stopProjector, unlockAudio } from "./sounds";

const LEADER_BEAT = 1000;

// Each title card fades in, holds, fades out, like cards cut on a timeline.
const CARDS = [
  { key: "studio", length: 2800 },
  { key: "title", length: 5200 },
  { key: "tagline", length: 3000 },
];

export default function Titles({ onComplete }) {
  const [phase, setPhase] = useState("invite");
  const [count, setCount] = useState(3);
  const [card, setCard] = useState(0);
  const finished = useRef(false);

  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    stopProjector();
    onComplete();
  };

  useEffect(() => {
    if (phase !== "leader") return undefined;
    const timers = [];
    [2, 1].forEach((value, index) => {
      timers.push(window.setTimeout(() => {
        setCount(value);
        playTick();
      }, LEADER_BEAT * (index + 1)));
    });
    timers.push(window.setTimeout(() => {
      stopProjector();
      setPhase("cards");
    }, LEADER_BEAT * 3));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [phase]);

  useEffect(() => {
    if (phase !== "cards") return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const timer = window.setTimeout(finish, 1600);
      return () => window.clearTimeout(timer);
    }
    if (card === 1) playThud();
    const timer = window.setTimeout(() => {
      if (card >= CARDS.length - 1) finish();
      else setCard(card + 1);
    }, CARDS[card].length);
    return () => window.clearTimeout(timer);
  }, [phase, card]);

  const begin = () => {
    if (phase !== "invite") {
      finish();
      return;
    }
    unlockAudio();
    startScore();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setPhase("cards");
      return;
    }
    playTick();
    startProjector();
    setPhase("leader");
  };

  const reduce = typeof window !== "undefined"
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const show = (index) => phase === "cards" && (reduce || card === index);
  const cardStyle = (index) => ({ "--len": `${CARDS[index].length}ms` });

  return (
    <section className={`s21-titles is-${phase}`} onClick={begin}>
      <div className="s21-motes" aria-hidden="true">
        {Array.from({ length: 22 }, (_, index) => (
          <i key={index} style={{ "--i": index }} />
        ))}
      </div>
      {phase === "cards" && <div className="s21-leak" aria-hidden="true" />}

      {phase === "invite" && (
        <div className="s21-invite">
          <p className="s21-smallcaps s21-invite-eyebrow">for Shansu</p>
          <p className="s21-smallcaps s21-invite-tap">tap anywhere to begin</p>
          <p className="s21-invite-note">sound on, cutessuu</p>
        </div>
      )}

      {phase === "leader" && (
        <div className="s21-leader" aria-hidden="true">
          <svg viewBox="0 0 320 320">
            <circle className="s21-leader-ring" cx="160" cy="160" r="118" />
            <circle className="s21-leader-ring is-inner" cx="160" cy="160" r="92" />
            <line className="s21-leader-cross" x1="160" y1="0" x2="160" y2="320" />
            <line className="s21-leader-cross" x1="0" y1="160" x2="320" y2="160" />
            <circle key={count} className="s21-leader-sweep" cx="160" cy="160" r="59" />
          </svg>
          <span key={`n-${count}`} className="s21-leader-number">{count}</span>
        </div>
      )}

      {show(0) && (
        <div key="studio" className="s21-card" style={cardStyle(0)}>
          <span className="s21-card-mark" aria-hidden="true" />
          <p className="s21-smallcaps s21-card-track">happy birthday, Shansu</p>
        </div>
      )}

      {show(1) && (
        <div key="title" className="s21-card is-title" style={cardStyle(1)}>
          <p className="s21-title-name">Sharanya</p>
          <p className="s21-title-sub">turns twenty-one</p>
        </div>
      )}

      {show(2) && (
        <div key="tagline" className="s21-card" style={cardStyle(2)}>
          <p className="s21-smallcaps s21-card-track">twenty-one reasons</p>
          <p className="s21-smallcaps s21-card-date">october 15, 2026</p>
        </div>
      )}

      {phase === "cards" && <p className="s21-skip s21-smallcaps">tap to skip</p>}
    </section>
  );
}
