import { useSyncExternalStore } from "react";

/* The boarding pass and its stub live on two different book pages, and the
   flipbook only re-renders its pages when their count changes, so props can't
   carry state between them. A tiny shared store does: both halves subscribe
   to the same ticket and update together. */

const EMPTY = Object.freeze({ scratched: false, redeemed: false });
const listeners = new Set();
let state = {};

const emit = () => listeners.forEach((listener) => listener());

export function hydrateTickets(redeemed = {}) {
  state = Object.fromEntries(
    Object.keys(redeemed)
      .filter((id) => redeemed[id])
      .map((id) => [id, { scratched: true, redeemed: true }])
  );
  emit();
}

export function setTicket(id, patch) {
  state = { ...state, [id]: { ...(state[id] || EMPTY), ...patch } };
  emit();
}

export function subscribeTickets(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export const getTickets = () => state;

export function useTicket(id) {
  return useSyncExternalStore(subscribeTickets, () => state[id] || EMPTY);
}

export function useRedeemedTickets() {
  const tickets = useSyncExternalStore(subscribeTickets, getTickets);
  return tickets;
}
