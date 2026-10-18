import { useEffect, type RefObject } from 'react';
import { getFocusable, getTrappedTarget } from './use-focus-trap.helper';

// Atrapa el foco dentro de un diálogo y lo devuelve al elemento que lo abrió al cerrarse.
export const useFocusTrap = (
  rootRef: RefObject<HTMLElement | null>,
  active: boolean,
  initialFocusRef?: RefObject<HTMLElement | null>,
) => {
  useEffect(() => {
    const root = rootRef.current;
    if (!active || !root) return undefined;

    const previous = document.activeElement as HTMLElement | null;
    (initialFocusRef?.current ?? getFocusable(root)[0] ?? root).focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const target = getTrappedTarget(root, document.activeElement, event.shiftKey);
      if (target) {
        event.preventDefault();
        target.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previous?.focus?.();
    };
  }, [active, rootRef, initialFocusRef]);
};
