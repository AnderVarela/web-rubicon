import { SectionId } from '@screens/components/section-nav';

// Orden de las secciones que activan el menú al hacer scroll.
export const SPY_SECTIONS: SectionId[] = [SectionId.CATALOG, SectionId.ABOUT, SectionId.REVIEWS, SectionId.VISIT];

// Una sección se considera activa cuando su borde superior pasa del 40 % de la pantalla.
export const ACTIVATION_RATIO = 0.4;
export const SCROLLED_THRESHOLD = 8;
