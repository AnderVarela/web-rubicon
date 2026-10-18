import { useEffect, useRef } from 'react';
import type { SectionId } from '@screens/components/section-nav';
import { getSectionHash, getSectionUrl } from './use-section-hash.helper';

// Mantiene el ancla de la URL en la sección visible para que, al recargar, la web abra donde se estaba.
// Usa replaceState: no añade entradas al historial ni provoca saltos de scroll.
export const useSectionHash = (activeId: SectionId) => {
  const firstRun = useRef(true);

  useEffect(() => {
    // La primera medición aún no refleja el scroll real (la página se acaba de pintar).
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (window.location.hash === getSectionHash(activeId)) return;
    window.history.replaceState(window.history.state, '', getSectionUrl(activeId, window.location));
  }, [activeId]);
};
