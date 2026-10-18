import { SectionId } from '@screens/components/section-nav';
import { ACTIVATION_RATIO, SCROLLED_THRESHOLD, SPY_SECTIONS } from './use-active-section.const';

export const getActiveSection = (doc: Document, viewportHeight: number): SectionId =>
  SPY_SECTIONS.reduce<SectionId>((active, id) => {
    const element = doc.getElementById(id);
    return element && element.getBoundingClientRect().top <= viewportHeight * ACTIVATION_RATIO ? id : active;
  }, SectionId.HOME);

export const isScrolled = (scrollY: number) => scrollY > SCROLLED_THRESHOLD;
