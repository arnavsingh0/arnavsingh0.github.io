import { useEffect, useRef } from "react";

const HALF = 0.055;
const DEPTH = 0.036;
const X0 = 48;
const X1 = 952;
const Y_TOP = 28;
const Y_BOTTOM = 168;
const F_MAX = 1.01;
const F_MIN = 0.955;
const STAR_X = 500;
const STAR_Y = 58;
const STAR_R = 26;

const fluxAt = (phase) => {
  const z = Math.abs(phase - 0.5) / HALF;
  if (z >= 1) return 1;
  return 1 - DEPTH * Math.sqrt(1 - z * z);
};

const xOf = (phase) => X0 + phase * (X1 - X0);

const yOf = (flux) => Y_TOP + ((F_MAX - flux) / (F_MAX - F_MIN)) * (Y_BOTTOM - Y_TOP);

const buildCurve = () => {
  const parts = [];
  for (let i = 0; i <= 240; i += 1) {
    const phase = i / 240;
    const command = i === 0 ? "M" : "L";
    parts.push(`${command}${xOf(phase).toFixed(1)} ${yOf(fluxAt(phase)).toFixed(1)}`);
  }
  return parts.join(" ");
};

const CURVE = buildCurve();
const BASELINE = yOf(1);

const Transit = () => {
  const phaseRef = useRef(0.5);
  const inTransitRef = useRef(true);
  const sliderRef = useRef(null);
  const planetRef = useRef(null);
  const starRef = useRef(null);
  const glowRef = useRef(null);
  const dotRef = useRef(null);
  const guideRef = useRef(null);
  const readRef = useRef(null);
  const liveRef = useRef(null);

  const paint = (phase) => {
    const flux = fluxAt(phase);
    const x = xOf(phase);
    const overStar = Math.abs(x - STAR_X) < STAR_R + 4;
    const depthT = Math.min(1, Math.max(0, (flux - (1 - DEPTH)) / DEPTH));
    const inTransit = Math.abs(phase - 0.5) < HALF;

    if (planetRef.current) {
      planetRef.current.setAttribute("cx", x.toFixed(1));
      planetRef.current.setAttribute("fill", overStar ? "#10161b" : "#f3ddb8");
    }
    if (starRef.current) {
      starRef.current.setAttribute("opacity", (0.58 + 0.42 * depthT).toFixed(3));
    }
    if (glowRef.current) {
      glowRef.current.setAttribute("opacity", (0.06 + 0.2 * depthT).toFixed(3));
    }
    if (dotRef.current) {
      dotRef.current.setAttribute("cx", x.toFixed(1));
      dotRef.current.setAttribute("cy", yOf(flux).toFixed(1));
    }
    if (guideRef.current) {
      guideRef.current.setAttribute("x1", x.toFixed(1));
      guideRef.current.setAttribute("x2", x.toFixed(1));
    }
    if (readRef.current) {
      readRef.current.textContent = `relative flux ${flux.toFixed(3)}  ·  ${inTransit ? "in transit" : "full light"}`;
    }
    if (sliderRef.current) {
      sliderRef.current.setAttribute("aria-valuenow", String(Math.round(phase * 100)));
      sliderRef.current.setAttribute(
        "aria-valuetext",
        inTransit ? "In transit, star dimmed" : "Out of transit, star at full light"
      );
    }
    if (liveRef.current && inTransit !== inTransitRef.current) {
      inTransitRef.current = inTransit;
      liveRef.current.textContent = inTransit
        ? "In transit. The star is dimmer."
        : "Out of transit. The star is at full light.";
    }
  };

  useEffect(() => {
    paint(phaseRef.current);
  }, []);

  const phaseFromClientX = (clientX) => {
    const rect = sliderRef.current.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    const phase = (ratio * 1000 - X0) / (X1 - X0);
    return Math.min(1, Math.max(0, phase));
  };

  const setPhase = (phase) => {
    phaseRef.current = phase;
    paint(phase);
  };

  const onPointerDown = (event) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setPhase(phaseFromClientX(event.clientX));
  };

  const onPointerMove = (event) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    setPhase(phaseFromClientX(event.clientX));
  };

  const onKeyDown = (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const delta = event.key === "ArrowRight" ? 0.015 : -0.015;
    setPhase(Math.min(1, Math.max(0, phaseRef.current + delta)));
  };

  return (
    <figure className="transit">
      <div
        className="plate transit-plate"
        ref={sliderRef}
        role="slider"
        tabIndex={0}
        aria-label="Transit phase"
        aria-orientation="horizontal"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={50}
        aria-valuetext="In transit, star dimmed"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onKeyDown={onKeyDown}
      >
        <p className="plate-kicker">Schematic, not a dataset</p>
        <svg className="transit-svg" viewBox="0 0 1000 250" aria-hidden="true">
          <circle ref={glowRef} cx={STAR_X} cy={STAR_Y} r="46" fill="#e7a15a" opacity="0.12" />
          <circle ref={starRef} cx={STAR_X} cy={STAR_Y} r={STAR_R} fill="#fff6e4" />
          <circle ref={planetRef} cx={STAR_X} cy={STAR_Y} r="10" fill="#10161b" />
          <line
            x1={X0}
            x2={X1}
            y1={BASELINE}
            y2={BASELINE}
            stroke="rgba(246,240,230,0.28)"
            strokeDasharray="2 6"
          />
          <path d={CURVE} fill="none" stroke="#e7a15a" strokeWidth="2.6" strokeLinejoin="round" />
          <line
            ref={guideRef}
            x1={STAR_X}
            x2={STAR_X}
            y1="108"
            y2="214"
            stroke="rgba(246,240,230,0.35)"
          />
          <circle ref={dotRef} cx={STAR_X} cy={yOf(fluxAt(0.5))} r="5.5" fill="#f6f0e6" />
        </svg>
        <p className="transit-read" ref={readRef}>
          relative flux 0.964 · in transit
        </p>
      </div>
      <figcaption>
        A drawing of a transit. Something smaller crosses a star, and the light dips. The
        vertical scale is stretched so a few percent is visible. Drag across it, or use the
        arrow keys. The photometry I actually reduced, at the South African Astronomical
        Observatory, was of cataclysmic variable stars. Those curves are much less tidy than
        this one.
      </figcaption>
      <p className="sr-only" aria-live="polite" ref={liveRef} />
    </figure>
  );
};

export default Transit;
