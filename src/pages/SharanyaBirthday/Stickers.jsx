import { useEffect, useState } from "react";
import { stickers as stickerTypes } from "../../data/sharanya21";

export function StickerArt({ type }) {
  return (
    <img src={`/sharanya21/stickers/${type}.webp`} alt="" draggable="false" />
  );
}

export function StickerTray({ onAdd }) {
  return (
    <div className="s21-tray" aria-label="stickers">
      <p className="s21-smallcaps s21-tray-title">tap one, then drag it anywhere</p>
      <div className="s21-tray-row">
        {stickerTypes.map((sticker) => (
          <button
            key={sticker.id}
            type="button"
            aria-label={sticker.label}
            onClick={() => onAdd(sticker.id)}
          >
            <StickerArt type={sticker.id} />
          </button>
        ))}
      </div>
    </div>
  );
}

export function StickerLayer({ rootRef, page, orientation, stickers, onMove }) {
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    const measure = () => {
      const root = rootRef.current;
      if (!root) return;
      const indexes = orientation === "portrait" ? [page] : [page, page + 1];
      const next = [];
      indexes.forEach((index) => {
        const node = root.querySelector(`[data-page-index="${index}"]`);
        if (!node) return;
        const rect = node.getBoundingClientRect();
        if (rect.width < 30 || rect.height < 30) return;
        next.push({ index, rect });
      });
      setBoxes(next);
    };
    measure();
    window.addEventListener("resize", measure);
    const timer = window.setTimeout(measure, 450);
    return () => {
      window.removeEventListener("resize", measure);
      window.clearTimeout(timer);
    };
  }, [rootRef, page, orientation, stickers.length]);

  return boxes.flatMap((box) =>
    stickers
      .filter((sticker) => sticker.page === box.index)
      .map((sticker) => (
        <button
          key={sticker.id}
          type="button"
          className="s21-sticker"
          aria-label="sticker"
          style={{
            left: box.rect.left + (sticker.x / 100) * box.rect.width,
            top: box.rect.top + (sticker.y / 100) * box.rect.height,
          }}
          onPointerDown={(event) => {
            event.stopPropagation();
            try {
              event.currentTarget.setPointerCapture(event.pointerId);
            } catch {
              /* capture is optional; the move handler still tracks the pointer */
            }
            event.currentTarget.dataset.drag = "1";
          }}
          onPointerMove={(event) => {
            if (event.currentTarget.dataset.drag !== "1") return;
            const x = ((event.clientX - box.rect.left) / box.rect.width) * 100;
            const y = ((event.clientY - box.rect.top) / box.rect.height) * 100;
            event.currentTarget.style.left = `${box.rect.left + (Math.min(92, Math.max(8, x)) / 100) * box.rect.width}px`;
            event.currentTarget.style.top = `${box.rect.top + (Math.min(92, Math.max(8, y)) / 100) * box.rect.height}px`;
          }}
          onPointerUp={(event) => {
            if (event.currentTarget.dataset.drag !== "1") return;
            event.currentTarget.dataset.drag = "0";
            const x = ((event.clientX - box.rect.left) / box.rect.width) * 100;
            const y = ((event.clientY - box.rect.top) / box.rect.height) * 100;
            onMove(
              sticker.id,
              Math.min(92, Math.max(8, x)),
              Math.min(92, Math.max(8, y))
            );
          }}
        >
          <StickerArt type={sticker.type} />
        </button>
      ))
  );
}
