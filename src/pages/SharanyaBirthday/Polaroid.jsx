import { useState } from "react";

const TAPES = ["#f2b6c6", "#f0d59a", "#d9c4f2", "#f7c3a8"];

export default function Polaroid({ photo, tilt = -1.5 }) {
  const [flipped, setFlipped] = useState(false);
  const [wide, setWide] = useState(false);
  const note = photo.hiddenNote;
  const tape = TAPES[Math.abs(Math.round(tilt * 10)) % TAPES.length];

  const body = (
    <>
      <span className="s21-washi" style={{ "--tape": tape }} />
      <span className="s21-flipcard">
        <span className={`s21-flipcard-inner ${flipped ? "is-flipped" : ""}`}>
          <span className="s21-face">
            <img
              src={photo.src}
              alt={photo.caption || ""}
              className={photo.fit === "contain" ? "is-contain" : ""}
              draggable="false"
              onLoad={(event) => {
                const img = event.currentTarget;
                if (img.naturalWidth > img.naturalHeight * 1.05) setWide(true);
              }}
            />
          </span>
          {note && (
            <span className="s21-face back">
              <p>{note}</p>
            </span>
          )}
        </span>
      </span>
      <span className="s21-caption">{photo.caption}</span>
      {note && !flipped && <span className="s21-tap-hint">psst</span>}
    </>
  );

  const className = `s21-polaroid ${wide ? "is-wide" : ""} ${photo.fit === "contain" ? "is-screen" : ""}`;
  const style = { "--tilt": `${tilt}deg` };

  if (!note) {
    return (
      <figure className={className} style={style}>
        {body}
      </figure>
    );
  }

  return (
    <button
      type="button"
      className={`${className} is-button`}
      style={style}
      onClick={() => setFlipped((open) => !open)}
    >
      {body}
    </button>
  );
}
