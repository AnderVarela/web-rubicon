import { useEffect, useState } from 'react';
import { SectionId } from '@screens/components/section-nav';
import { getActiveSection, isScrolled } from './use-active-section.helper';

interface ActiveSection {
  activeId: SectionId;
  scrolled: boolean;
}

// Sección visible y si la página se ha desplazado (para el menú y la cabecera).
export const useActiveSection = (): ActiveSection => {
  const [state, setState] = useState<ActiveSection>({ activeId: SectionId.HOME, scrolled: false });

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const next = { activeId: getActiveSection(document, window.innerHeight), scrolled: isScrolled(window.scrollY) };
        setState((previous) =>
          previous.activeId === next.activeId && previous.scrolled === next.scrolled ? previous : next,
        );
      });
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return state;
};
