import { useEffect, useState } from 'react';

interface Presence {
  mounted: boolean;
  visible: boolean;
}

// Mantiene montado un elemento mientras dura su animación de salida.
// `visible` pasa a true un fotograma después de montar para que la entrada se anime.
export const usePresence = (open: boolean, exitMs: number): Presence => {
  const [previousOpen, setPreviousOpen] = useState(open);
  const [closing, setClosing] = useState(false);
  const [entered, setEntered] = useState(open);

  if (open !== previousOpen) {
    setPreviousOpen(open);
    setClosing(!open && exitMs > 0);
    setEntered(false);
  }

  useEffect(() => {
    if (!open) return undefined;
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setEntered(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [open]);

  useEffect(() => {
    if (!closing) return undefined;
    const timer = window.setTimeout(() => setClosing(false), exitMs);
    return () => window.clearTimeout(timer);
  }, [closing, exitMs]);

  return { mounted: open || closing, visible: open && entered };
};
