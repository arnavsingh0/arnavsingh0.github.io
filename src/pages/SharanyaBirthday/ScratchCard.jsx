import { useEffect, useRef, useState } from "react";

const DPR = () => Math.min(window.devicePixelRatio || 1, 2);

function paintFoil(ctx, width, height) {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalCompositeOperation = "source-over";
  const dpr = DPR();
  ctx.scale(dpr, dpr);
  ctx.fillStyle = "#e7b4c4";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "rgba(255,255,255,0.22)";
  for (let x = -height; x < width; x += 14) {
    ctx.fillRect(x, 0, 4, height);
  }
  ctx.fillStyle = "#8d445c";
  ctx.font = 'italic 500 15px "Playfair Display", Georgia, serif';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("scratch me", width / 2, height / 2);
}

export default function ScratchCard({ children, revealed = false, onReveal }) {
  const canvasRef = useRef(null);
  const [scratchedOpen, setOpen] = useState(false);
  const open = revealed || scratchedOpen;

  // Keep the backing store in step with the laid-out size. Pages inside the
  // flipbook can be measured before their final size, so this is called on
  // every size change and again on the first touch.
  const ensureSize = (preserve) => {
    const canvas = canvasRef.current;
    if (!canvas) return false;
    const rect = canvas.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return false;
    const dpr = DPR();
    const width = Math.round(rect.width * dpr);
    const height = Math.round(rect.height * dpr);
    if (canvas.width === width && canvas.height === height) return true;
    let snapshot = null;
    if (preserve && canvas.width > 1 && canvas.height > 1) {
      snapshot = document.createElement("canvas");
      snapshot.width = canvas.width;
      snapshot.height = canvas.height;
      snapshot.getContext("2d").drawImage(canvas, 0, 0);
    }
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    paintFoil(ctx, rect.width, rect.height);
    if (snapshot) {
      // carry over what has been scratched, stretched to the new size
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalCompositeOperation = "destination-in";
      ctx.drawImage(snapshot, 0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";
    }
    return true;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || open) return undefined;
    ensureSize(false);
    const observer = new ResizeObserver(() => ensureSize(true));
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [open]);

  const scratch = (event) => {
    const canvas = canvasRef.current;
    if (!canvas || open) return;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const sx = canvas.width / rect.width;
    const sy = canvas.height / rect.height;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalCompositeOperation = "destination-out";
    const point = (clientX, clientY) => {
      ctx.beginPath();
      ctx.ellipse((clientX - rect.left) * sx, (clientY - rect.top) * sy, 22 * sx, 22 * sy, 0, 0, Math.PI * 2);
      ctx.fill();
    };
    if (event.touches) {
      Array.from(event.touches).forEach((touch) => point(touch.clientX, touch.clientY));
    } else {
      point(event.clientX, event.clientY);
    }

    if (event.type !== "pointermove" || Math.random() > 0.75) return;
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let clear = 0;
    for (let i = 3; i < pixels.length; i += 16) {
      if (pixels[i] < 20) clear += 1;
    }
    if (clear / (pixels.length / 16) > 0.45) {
      setOpen(true);
      onReveal?.();
    }
  };

  return (
    <div className={`s21-scratch ${open ? "is-open" : ""}`}>
      <div className="s21-scratch-reveal">{children}</div>
      {!open && (
        <canvas
          ref={canvasRef}
          onPointerDown={(event) => {
            event.stopPropagation();
            ensureSize(true);
            scratch(event);
          }}
          onPointerMove={(event) => {
            if (event.buttons !== 1 && event.pointerType !== "touch") return;
            event.stopPropagation();
            scratch(event);
          }}
          onMouseDown={(event) => event.stopPropagation()}
          onTouchStart={(event) => event.stopPropagation()}
        />
      )}
    </div>
  );
}
