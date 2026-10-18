import { useEffect, type RefObject } from 'react';
import { useReducedMotion } from '@hooks/use-reduced-motion';
import { REVEAL_ROOT_MARGIN, REVEAL_STATE_ATTRIBUTE, REVEAL_VIEWPORT_RATIO, RevealState } from './use-reveal.const';

// Marca el bloque como oculto si está por debajo de la pantalla y lo muestra al entrar en ella.
// Se escribe directamente en el DOM para no provocar renders y para que sin JavaScript todo sea visible.
export const useReveal = (ref: RefObject<HTMLElement | null>) => {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reducedMotion || !('IntersectionObserver' in window)) return undefined;
    if (element.getBoundingClientRect().top < window.innerHeight * REVEAL_VIEWPORT_RATIO) return undefined;

    element.setAttribute(REVEAL_STATE_ATTRIBUTE, RevealState.HIDDEN);
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        element.setAttribute(REVEAL_STATE_ATTRIBUTE, RevealState.SHOWN);
        observer.disconnect();
      },
      { rootMargin: REVEAL_ROOT_MARGIN },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      element.removeAttribute(REVEAL_STATE_ATTRIBUTE);
    };
  }, [ref, reducedMotion]);
};
