import { useEffect } from 'react';
import { SCROLL_LOCK_ATTRIBUTE } from './use-scroll-lock.const';

// Bloquea el scroll de la página mientras hay un panel abierto encima.
export const useScrollLock = (active: boolean) => {
  useEffect(() => {
    if (!active) return undefined;
    document.body.setAttribute(SCROLL_LOCK_ATTRIBUTE, 'true');
    return () => document.body.removeAttribute(SCROLL_LOCK_ATTRIBUTE);
  }, [active]);
};
