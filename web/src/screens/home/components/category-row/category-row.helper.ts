import type { CSSProperties, KeyboardEvent } from 'react';
import type { ScrollProgress } from '@screens/home/hooks/use-scroll-progress';
import { CARD_GAP, CATEGORY_ANCHOR_PREFIX, KEY_NEXT, KEY_PREVIOUS, ROW_EDGE_ALLOWANCE, ScrollDirection } from './category-row.const';

export const getCategoryAnchor = (id: string) => `${CATEGORY_ANCHOR_PREFIX}${id}`;

// Avanza tantas tarjetas completas como quepan en pantalla.
export const getScrollDistance = (row: HTMLElement) => {
  const card = row.firstElementChild as HTMLElement | null;
  const step = card ? card.offsetWidth + CARD_GAP : row.clientWidth * 0.8;
  const cards = Math.max(1, Math.floor((row.clientWidth - ROW_EDGE_ALLOWANCE) / step));
  return cards * step;
};

export const scrollRow = (row: HTMLElement | null, direction: ScrollDirection, smooth: boolean) => {
  row?.scrollBy({ left: direction * getScrollDistance(row), behavior: smooth ? 'smooth' : 'auto' });
};

export const getKeyDirection = (key: string): ScrollDirection | null => {
  if (key === KEY_NEXT) return ScrollDirection.FORWARD;
  if (key === KEY_PREVIOUS) return ScrollDirection.BACK;
  return null;
};

// Con el foco en la fila, las flechas la desplazan; con el foco en una tarjeta, saltan a la vecina.
export const handleRowKeyDown = (event: KeyboardEvent<HTMLElement>, smooth: boolean) => {
  const direction = getKeyDirection(event.key);
  if (direction === null) return;
  event.preventDefault();

  if (event.target === event.currentTarget) {
    scrollRow(event.currentTarget, direction, smooth);
    return;
  }

  const current = event.target as HTMLElement;
  const sibling = (direction === ScrollDirection.FORWARD ? current.nextElementSibling : current.previousElementSibling) as HTMLElement | null;
  sibling?.focus();
};

export const getThumbStyle = ({ progress, visibleFraction }: ScrollProgress) =>
  ({
    '--thumb-width': `${visibleFraction * 100}%`,
    '--thumb-left': `${progress * (1 - visibleFraction) * 100}%`,
  }) as CSSProperties;
