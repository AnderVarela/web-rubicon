import { useEffect, useState, type RefObject } from 'react';
import { INITIAL_PROGRESS, isSameProgress, measureScroll, type ScrollProgress } from './use-scroll-progress.helper';

// Cuánto se ha desplazado una fila lateral (para las flechas y la barra de progreso).
export const useScrollProgress = (ref: RefObject<HTMLElement | null>): ScrollProgress => {
  const [state, setState] = useState<ScrollProgress>(INITIAL_PROGRESS);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const update = () => {
      const next = measureScroll(element);
      setState((previous) => (isSameProgress(previous, next) ? previous : next));
    };

    update();
    element.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(update);
    observer?.observe(element);

    return () => {
      element.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      observer?.disconnect();
    };
  }, [ref]);

  return state;
};
