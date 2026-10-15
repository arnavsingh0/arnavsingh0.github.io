const KEY = "sharanya21-gift";

const STAGES = ["titles", "trace", "shots", "candles", "book", "tickets", "credits"];

const empty = {
  stage: "titles",
  stickers: [],
  redeemed: {},
  page: 0,
};

export function loadGift() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || "null");
    if (!raw) return { ...empty, stickers: [], redeemed: {} };
    return {
      stage: STAGES.includes(raw.stage) ? raw.stage : "titles",
      stickers: Array.isArray(raw.stickers) ? raw.stickers : [],
      redeemed: raw.redeemed && typeof raw.redeemed === "object" ? raw.redeemed : {},
      page: Number.isFinite(raw.page) ? raw.page : 0,
    };
  } catch {
    return { ...empty, stickers: [], redeemed: {} };
  }
}

export function saveGift(patch) {
  const next = { ...loadGift(), ...patch };
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}
