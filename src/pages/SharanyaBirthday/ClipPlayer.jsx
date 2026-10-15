import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { clips } from "../../data/sharanya21";
import { setScoreDuck } from "./score";

export function ClipStage({ rootRef }) {
  const videos = useRef(new Map());

  useEffect(() => {
    let frame = 0;
    const loop = () => {
      const root = rootRef.current;
      const slots = root ? [...root.querySelectorAll(".s21-clip-slot")] : [];
      const seen = new Set();
      slots.forEach((slot) => {
        const id = slot.dataset.clip;
        const video = videos.current.get(id);
        if (!video) return;
        const rect = slot.getBoundingClientRect();
        const layoutW = slot.offsetWidth;
        const layoutH = slot.offsetHeight;
        const visible = layoutW > 36 && layoutH > 36 && rect.bottom > 40 && rect.right > 40
          && rect.top < window.innerHeight && rect.left < window.innerWidth;
        if (!visible) {
          video.style.display = "none";
          if (video.classList.contains("is-sound")) {
            video.muted = true;
            video.classList.remove("is-sound");
            setScoreDuck(false);
          }
          if (!video.paused) video.pause();
          return;
        }
        seen.add(id);
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        video.style.display = "block";
        video.style.width = `${layoutW}px`;
        video.style.height = `${layoutH}px`;
        video.style.left = `${cx - layoutW / 2}px`;
        video.style.top = `${cy - layoutH / 2}px`;
        if (video.paused) video.play().catch(() => {});
      });
      videos.current.forEach((video, id) => {
        if (seen.has(id)) return;
        video.style.display = "none";
        if (!video.paused) video.pause();
      });
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [rootRef]);

  return createPortal(
    <div className="s21-clip-layer">
      {Object.entries(clips).map(([id, clip]) => (
        <video
          key={id}
          ref={(node) => {
            if (node) videos.current.set(id, node);
            else videos.current.delete(id);
          }}
          className="s21-clip-float"
          src={clip.src}
          poster={clip.poster}
          muted
          loop
          playsInline
          preload="auto"
          onClick={(event) => {
            event.stopPropagation();
            const video = event.currentTarget;
            video.muted = !video.muted;
            video.classList.toggle("is-sound", !video.muted);
            setScoreDuck(!video.muted);
          }}
        />
      ))}
    </div>,
    document.body
  );
}
