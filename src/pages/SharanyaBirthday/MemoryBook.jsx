import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import "page-flip/src/Style/stPageFlip.css";
import { backCover, clips, chapters, cover, reasons } from "../../data/sharanya21";
import { playPaper, playPop, unlockAudio } from "./sounds";
import gsap from "gsap";
import Polaroid from "./Polaroid";
import { ClipStage } from "./ClipPlayer";
import Sloth from "./Sloth";
import { StickerArt, StickerLayer, StickerTray } from "./Stickers";

const ROMAN = { i: "I", ii: "II", iii: "III" };

const BookPage = forwardRef(function BookPage({ children, hard, pageIndex, className }, ref) {
  return (
    <div
      ref={ref}
      data-page-index={pageIndex}
      data-density={hard ? "hard" : "soft"}
      className={`s21-page ${hard ? "is-hard" : ""} ${className || ""}`}
    >
      <div className="s21-page-inner">{children}</div>
    </div>
  );
});

function buildPages() {
  const pages = [{ key: "cover", kind: "cover", hard: true }];
  const insert = {
    1: chapters[0],
    8: chapters[1],
    15: chapters[2],
  };
  reasons.forEach((reason) => {
    const chapter = insert[reason.id];
    if (chapter) {
      pages.push({ key: `ch-${chapter.id}-l`, kind: "chapter", chapter, side: "left" });
      pages.push({ key: `ch-${chapter.id}-r`, kind: "chapter", chapter, side: "right" });
    }
    pages.push({ key: `text-${reason.id}`, kind: "text", reason });
    pages.push({ key: `photos-${reason.id}`, kind: "photos", reason });
  });
  pages.push({ key: "back", kind: "back", hard: true });
  return pages;
}

function pageLabel(pages, index) {
  const page = pages[index];
  if (!page) return "";
  if (page.kind === "cover") return "the book";
  if (page.kind === "chapter") return page.chapter.kicker;
  if (page.kind === "text" || page.kind === "photos") return `reason ${page.reason.id} of 21`;
  return "the end";
}

function Words({ text, className }) {
  return (
    <p className={className}>
      {text.split(" ").map((word, index) => (
        <span key={`${word}-${index}`} className="s21-word" style={{ "--i": index }}>
          {word}{" "}
        </span>
      ))}
    </p>
  );
}

function Shots({ reason }) {
  const clip = reason.clip ? clips[reason.clip] : null;
  const photos = reason.photos;
  const layout = photos.length > 1
    ? (clip ? "duo-film" : "duo")
    : clip
      ? (clip.vertical ? "solo-tall" : "solo-film")
      : "solo";

  const film = clip && (
    <div className={`s21-film ${clip.vertical ? "is-vertical" : "is-wide"}`}>
      <div
        className="s21-clip-slot"
        data-clip={reason.clip}
        style={{ backgroundImage: `url(${clip.poster})` }}
      />
      <span className="s21-film-label">{clip.label}</span>
    </div>
  );

  return (
    <div className={`s21-shots is-${layout}`}>
      {photos.map((photo, index) => (
        <Polaroid key={photo.src} photo={photo} tilt={index % 2 === 0 ? -2.2 : 2.4} />
      ))}
      {film}
    </div>
  );
}

function PageBody({ page, onDone }) {
  if (page.kind === "cover") {
    return (
      <div className="s21-cover">
        <span className="s21-cover-frame" aria-hidden="true" />
        <p className="s21-smallcaps">{cover.kicker}</p>
        <div className="s21-gold-rule" />
        <h1 className="s21-foil">{cover.title}</h1>
        <p className="s21-script">{cover.name}</p>
        <p className="s21-subtitle">{cover.subtitle}</p>
        <p className="s21-smallcaps s21-cover-hint">open me</p>
      </div>
    );
  }

  if (page.kind === "chapter") {
    if (page.side === "left") {
      return (
        <div className="s21-chapter is-left">
          <p className="s21-smallcaps">chapter</p>
          <span className="s21-chapter-numeral s21-foil">{ROMAN[page.chapter.id]}</span>
        </div>
      );
    }
    return (
      <div className="s21-chapter is-right">
        <p className="s21-smallcaps">{page.chapter.kicker}</p>
        <h2>{page.chapter.title}</h2>
        <div className="s21-gold-rule" />
        <Words className="s21-chapter-line" text={page.chapter.line} />
      </div>
    );
  }

  if (page.kind === "text") {
    const layout = page.reason.id === 21 ? "letter" : page.reason.id % 2 ? "verse" : "margin";
    return (
      <div className={`s21-letter is-${layout}`}>
        <span className="s21-watermark" aria-hidden="true">{page.reason.id}</span>
        <p className="s21-smallcaps s21-reason-kicker">reason {page.reason.id} of 21</p>
        {layout === "letter" && <p className="s21-salute">dear Shansu,</p>}
        <h2 className="s21-reason-title">{page.reason.title}</h2>
        <Words className="s21-reason-text" text={page.reason.text} />
        {layout === "letter" && <p className="s21-signoff">always, arnu</p>}
      </div>
    );
  }

  if (page.kind === "photos") {
    return <Shots reason={page.reason} />;
  }

  return (
    <div className="s21-back">
      <span className="s21-cover-frame" aria-hidden="true" />
      <h2 className="s21-foil">{backCover.title}</h2>
      <p className="s21-subtitle">{backCover.subtitle}</p>
      <button type="button" className="s21-textlink s21-roll" onClick={onDone}>
        {backCover.action}
      </button>
    </div>
  );
}

export default function MemoryBook({
  initialPage = 0,
  initialStickers = [],
  onPersist,
  onDone,
}) {
  const pages = useMemo(() => buildPages(), []);
  const bookRef = useRef(null);
  const slotRef = useRef(null);
  const [page, setPage] = useState(initialPage);
  const [orientation, setOrientation] = useState(() => (
    window.innerWidth < 860 ? "portrait" : "landscape"
  ));
  const [stickers, setStickers] = useState(initialStickers);
  const [trayOpen, setTrayOpen] = useState(false);

  const markLive = (index, orient = orientation) => {
    const root = slotRef.current;
    if (!root) return;
    root.querySelectorAll("[data-page-index]").forEach((node) => {
      const pageIndex = Number(node.dataset.pageIndex);
      const live = orient === "portrait"
        ? pageIndex === index
        : pageIndex === index || pageIndex === index + 1;
      node.classList.toggle("is-live", live);
    });
  };

  useEffect(() => {
    const node = slotRef.current;
    if (!node) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) {
      gsap.fromTo(node, { opacity: 0, y: 36, scale: 0.97 }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.25,
      });
    }
    const timers = [80, 450, 1000].map((ms) => window.setTimeout(() => markLive(initialPage), ms));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [initialPage]);

  useEffect(() => {
    onPersist?.({ page, stickers });
  }, [page, stickers, onPersist]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      if (event.key === "ArrowRight" && page >= pages.length - 1) {
        onDone?.();
        return;
      }
      unlockAudio();
      const flip = bookRef.current?.pageFlip();
      if (!flip) return;
      if (event.key === "ArrowRight") flip.flipNext();
      else flip.flipPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [page, pages.length, onDone]);

  const turn = (direction) => {
    unlockAudio();
    const flip = bookRef.current?.pageFlip();
    if (direction > 0 && page >= pages.length - 1) {
      onDone?.();
      return;
    }
    if (!flip) return;
    if (direction > 0) flip.flipNext();
    else flip.flipPrev();
  };

  const addSticker = (type) => {
    if (stickers.length >= 30) return;
    const right = pages[page + 1];
    const target = orientation !== "portrait" && right && right.kind === "photos"
      ? page + 1
      : page;
    playPop();
    setStickers((current) => [
      ...current,
      {
        id: `${Date.now()}-${type}`,
        type,
        page: target,
        x: 22 + Math.random() * 46,
        y: 18 + Math.random() * 48,
      },
    ]);
  };

  const leaves = pages.map((item, index) => (
    <BookPage key={item.key} hard={item.hard} pageIndex={index}>
      <PageBody page={item} onDone={() => onDone?.()} />
    </BookPage>
  ));

  const current = pages[page];
  const reasonIndex = current?.reason ? current.reason.id : null;
  const reached = reasonIndex
    || (current?.kind === "back" ? 21 : 0);

  return (
    <section className="s21-book-stage">
      <div className="s21-lamp" aria-hidden="true" />
      <div className="s21-motes is-dust" aria-hidden="true">
        {Array.from({ length: 16 }, (_, index) => (
          <i key={index} style={{ "--i": index }} />
        ))}
      </div>
      <div className="s21-book-slot" ref={slotRef}>
        <HTMLFlipBook
          ref={bookRef}
          className="s21-flipbook"
          width={400}
          height={560}
          size="stretch"
          minWidth={260}
          maxWidth={600}
          minHeight={364}
          maxHeight={840}
          drawShadow
          flippingTime={760}
          usePortrait
          startPage={initialPage}
          autoSize
          maxShadowOpacity={0.4}
          showCover
          mobileScrollSupport
          clickEventForward
          useMouseEvents
          swipeDistance={28}
          showPageCorners
          disableFlipByClick={false}
          renderOnlyPageLengthChange
          onFlip={(event) => {
            setPage(event.data);
            markLive(event.data);
            playPaper();
          }}
          onChangeOrientation={(event) => {
            setOrientation(event.data);
            markLive(page, event.data);
          }}
        >
          {leaves}
        </HTMLFlipBook>
      </div>
      <StickerLayer
        rootRef={slotRef}
        page={page}
        orientation={orientation}
        stickers={stickers}
        onMove={(id, x, y) => {
          setStickers((current) => current.map((sticker) => (
            sticker.id === id ? { ...sticker, x, y } : sticker
          )));
        }}
      />
      <div className="s21-nav">
        <button type="button" className="s21-edge" aria-label="previous page" onClick={() => turn(-1)} />
        <div className="s21-nav-center">
          <p className="s21-page-label s21-smallcaps">{pageLabel(pages, page)}</p>
          <div className="s21-progress" aria-hidden="true">
            {Array.from({ length: 21 }, (_, index) => (
              <i
                key={index}
                className={`${reached > index ? "is-on" : ""} ${reasonIndex === index + 1 ? "is-now" : ""}`}
              />
            ))}
          </div>
        </div>
        <button type="button" className="s21-edge is-next" aria-label="next page" onClick={() => turn(1)} />
      </div>
      <div className={`s21-sticker-dock ${trayOpen ? "is-open" : ""} ${!trayOpen && stickers.length === 0 ? "is-nudge" : ""}`}>
        {!trayOpen && stickers.length === 0 && (
          <p className="s21-dock-hint">psst — stickers, cutessuu</p>
        )}
        <button
          type="button"
          className="s21-envelope"
          onClick={() => setTrayOpen((open) => !open)}
          aria-expanded={trayOpen}
          aria-label={trayOpen ? "close stickers" : "open stickers"}
        >
          <span className="s21-envelope-fan" aria-hidden="true">
            <StickerArt type="heart" />
            <StickerArt type="jellycat" />
            <StickerArt type="matcha" />
          </span>
          <span className="s21-envelope-label">{trayOpen ? "close" : "stickers"}</span>
        </button>
        {trayOpen && <StickerTray onAdd={addSticker} />}
      </div>
      <ClipStage rootRef={slotRef} />
      <Sloth
        rootRef={slotRef}
        page={page}
        kind={current?.kind}
        reasonId={reasonIndex}
        orientation={orientation}
      />
    </section>
  );
}
