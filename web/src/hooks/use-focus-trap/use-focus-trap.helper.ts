import { FOCUSABLE_SELECTOR } from './use-focus-trap.const';

export const getFocusable = (root: HTMLElement): HTMLElement[] =>
  Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));

// Devuelve el elemento que debe recibir el foco al pulsar Tab, o null si no hay que intervenir.
export const getTrappedTarget = (root: HTMLElement, active: Element | null, backwards: boolean): HTMLElement | null => {
  const items = getFocusable(root);
  if (!items.length) return root;
  const first = items[0];
  const last = items[items.length - 1];
  if (!root.contains(active)) return backwards ? last : first;
  if (backwards && active === first) return last;
  if (!backwards && active === last) return first;
  return null;
};
