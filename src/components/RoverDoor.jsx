import { Link } from "react-router-dom";

const RoverDoor = () => {
  return (
    <Link className="door" to="/lunar-rover">
      <svg className="door-scene" viewBox="0 0 640 280" aria-hidden="true">
        <circle cx="78" cy="48" r="1.2" fill="#f6f0e6" />
        <circle cx="140" cy="72" r="0.9" fill="#f6f0e6" />
        <circle cx="210" cy="36" r="1.1" fill="#f6f0e6" />
        <circle cx="300" cy="58" r="0.8" fill="#f6f0e6" />
        <circle cx="390" cy="28" r="1.2" fill="#f6f0e6" />
        <circle cx="470" cy="64" r="0.9" fill="#f6f0e6" />
        <circle cx="560" cy="42" r="1.1" fill="#f6f0e6" />
        <path d="M0 196 C160 168 300 188 460 176 C540 170 590 184 640 178 L640 280 L0 280 Z" fill="#10161b" />
        <polygon points="492,168 500,150 508,168 500,176" fill="#e7a15a" />
        <g className="door-rover">
          <polygon className="door-light" points="118,78 210,62 210,98" fill="#e7a15a" />
          <rect x="18" y="62" width="108" height="26" rx="2" fill="#e6d3b4" />
          <rect x="34" y="48" width="42" height="16" fill="#cbb892" />
          <line x1="92" y1="62" x2="108" y2="40" stroke="#f6f0e6" strokeWidth="2" />
          <rect x="102" y="34" width="16" height="8" fill="#f6f0e6" />
          {[16, 36, 56, 78, 98, 118].map((cx) => (
            <g key={cx}>
              <circle cx={cx} cy="96" r="9" fill="#1a140f" />
              <circle cx={cx} cy="96" r="3.5" fill="#e6d3b4" />
            </g>
          ))}
        </g>
      </svg>
      <span className="door-copy">
        <span className="plate-kicker">A game</span>
        <h3 className="door-title">Lunar Rover Rescue</h3>
        <span className="door-text">
          Drive a rover across rough terrain and collect the crystals scattered on it.
          It runs in the browser.
        </span>
        <span className="door-go">Drive</span>
      </span>
    </Link>
  );
};

export default RoverDoor;
