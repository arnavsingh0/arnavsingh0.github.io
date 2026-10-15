import { useEffect, useMemo, useState } from "react";
import { closing, tickets } from "../../data/sharanya21";
import BoardingPass from "./BoardingPass";
import { playPaper, unlockAudio } from "./sounds";
import { hydrateTickets, useRedeemedTickets } from "./ticketState";

// The last thing before the credits: her tickets, one at a time, full screen.

export default function Tickets({ initialRedeemed = {}, onPersist, onComplete }) {
  useState(() => hydrateTickets(initialRedeemed));
  const state = useRedeemedTickets();
  const redeemed = useMemo(() => (
    Object.fromEntries(Object.entries(state).filter(([, t]) => t.redeemed).map(([id]) => [id, true]))
  ), [state]);
  const [index, setIndex] = useState(0);
  const ticket = tickets[index];
  const last = index === tickets.length - 1;

  useEffect(() => {
    onPersist?.({ redeemed });
  }, [redeemed, onPersist]);

  const go = (step) => {
    unlockAudio();
    playPaper();
    setIndex((current) => Math.min(tickets.length - 1, Math.max(0, current + step)));
  };

  return (
    <section className="s21-stage s21-tickets-stage">
      <div className="s21-tickets-card">
        <p className="s21-smallcaps s21-tickets-eyebrow">before the credits</p>
        <h1 className="s21-invite-title">{closing.title}</h1>
        <p className="s21-tickets-text">{closing.text}</p>

        <div className="s21-tickets-slot" key={ticket.id}>
          <p className="s21-smallcaps s21-tickets-label">
            {index + 1} of {tickets.length} · {ticket.dream ? "the dream ticket" : "boarding pass"}
          </p>
          <BoardingPass ticket={ticket} />
        </div>

        {index === 0 && <p className="s21-tickets-hint">{closing.aside}</p>}

        <div className="s21-tickets-nav">
          {index > 0 && (
            <button type="button" className="s21-textlink is-quiet" onClick={() => go(-1)}>
              back to the first one
            </button>
          )}
          {last ? (
            <button
              type="button"
              className="s21-textlink s21-roll"
              onClick={() => {
                unlockAudio();
                onComplete?.();
              }}
            >
              {closing.action}
            </button>
          ) : (
            <button type="button" className="s21-textlink" onClick={() => go(1)}>
              {closing.next}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
