import { extras } from "../../data/sharanya21";
import ScratchCard from "./ScratchCard";
import { playStamp } from "./sounds";
import { setTicket, useTicket } from "./ticketState";

/* One boarding pass: the main part and its tear-off stub joined along a
   perforation, with the note and the redeem button beneath. */

const CODE = (ticket) => (ticket.dream ? "SHN 2100 DRM" : "SHN 1015 MIA");

function cardClass(ticket, done, side) {
  return [
    "s21-pass-card",
    side === "main" ? "is-main" : "is-stub",
    ticket.dream ? "is-dream" : "",
    done ? "is-stamped" : "",
  ].join(" ");
}

export default function BoardingPass({ ticket }) {
  const { scratched, redeemed } = useTicket(ticket.id);
  const hidden = ticket.scratch && !scratched && !redeemed;

  return (
    <div className={`s21-pass ${ticket.dream ? "is-dream" : ""}`}>
      <div className="s21-ticket">
        <article className={cardClass(ticket, redeemed, "main")}>
          <header className="s21-pass-top">
            <span className="s21-pass-airline">{ticket.airline}</span>
            <span className="s21-pass-valid">redeemable whenever</span>
            <span className="s21-pass-flight">{ticket.flight}</span>
          </header>
          <div className="s21-route">
            <div>
              <span>from</span>
              <strong>{ticket.from}</strong>
            </div>
            <span className="s21-route-plane" aria-hidden="true" />
            <div className="is-to">
              <span>{ticket.dream ? "dream" : "to"}</span>
              <strong>{hidden ? "— — —" : ticket.to}</strong>
            </div>
          </div>
          <ScratchCard revealed={!hidden} onReveal={() => setTicket(ticket.id, { scratched: true })}>
            {ticket.to}
          </ScratchCard>
          <dl className="s21-pass-meta">
            <div><dt>passenger</dt><dd>{ticket.passenger}</dd></div>
            <div><dt>seat</dt><dd>{ticket.seat}</dd></div>
            <div><dt>valid</dt><dd>{ticket.valid}</dd></div>
          </dl>
          <p className="s21-pass-fine">no expiry · no blackout dates · one of one</p>
          <div className="s21-pass-foot">
            <div className="s21-barcode" aria-hidden="true" />
            <span className="s21-pass-code">{CODE(ticket)}</span>
          </div>
          {redeemed && <div className="s21-seal">redeemed</div>}
        </article>

        <article className={cardClass(ticket, redeemed, "stub")}>
          <header className="s21-pass-top">
            <span className="s21-pass-flight">{ticket.flight}</span>
            <span className="s21-pass-airline">stub</span>
          </header>
          <div className="s21-stub-to">
            <span>{ticket.dream ? "dream" : "to"}</span>
            <strong>{hidden ? "— — —" : ticket.to}</strong>
          </div>
          <dl className="s21-pass-meta is-stub">
            <div><dt>seat</dt><dd>{ticket.seat}</dd></div>
            <div><dt>gate</dt><dd>{ticket.gate}</dd></div>
          </dl>
          <p className="s21-stub-valid">redeemable whenever</p>
          <div className="s21-pass-foot">
            <div className="s21-barcode" aria-hidden="true" />
            <span className="s21-pass-code">{CODE(ticket)}</span>
          </div>
          {redeemed && <div className="s21-seal is-small">redeemed</div>}
        </article>
      </div>

      <div className="s21-pass-below">
        <p className="s21-pass-note">{ticket.note}</p>
        {redeemed ? (
          <p className="s21-redeemed">{ticket.redeemedText}</p>
        ) : (
          <button
            type="button"
            className="s21-textlink s21-redeem"
            onClick={() => {
              playStamp();
              setTicket(ticket.id, { redeemed: true });
            }}
            disabled={hidden}
          >
            {hidden ? "scratch first, cutessuu" : "redeem with arnu"}
          </button>
        )}
        {ticket.dream && <p className="s21-pass-terms">* {extras.dreamTerms}</p>}
      </div>
    </div>
  );
}
