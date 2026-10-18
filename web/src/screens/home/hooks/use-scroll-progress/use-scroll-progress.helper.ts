import { EDGE_TOLERANCE } from './use-scroll-progress.const';

export interface ScrollProgress {
  progress: number;
  visibleFraction: number;
  atStart: boolean;
  atEnd: boolean;
}

export const INITIAL_PROGRESS: ScrollProgress = { progress: 0, visibleFraction: 1, atStart: true, atEnd: true };

export const measureScroll = ({ scrollLeft, scrollWidth, clientWidth }: Pick<HTMLElement, 'scrollLeft' | 'scrollWidth' | 'clientWidth'>): ScrollProgress => {
  const max = scrollWidth - clientWidth;
  const progress = max > 0 ? Math.min(1, Math.max(0, scrollLeft / max)) : 0;
  return {
    progress,
    visibleFraction: scrollWidth > 0 ? Math.min(1, clientWidth / scrollWidth) : 1,
    atStart: progress < EDGE_TOLERANCE,
    atEnd: max <= 1 || progress > 1 - EDGE_TOLERANCE,
  };
};

export const isSameProgress = (a: ScrollProgress, b: ScrollProgress) =>
  a.progress === b.progress && a.visibleFraction === b.visibleFraction && a.atStart === b.atStart && a.atEnd === b.atEnd;
