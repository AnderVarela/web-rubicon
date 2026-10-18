import { SectionId } from './section-nav.const';

// Desde la portada basta el ancla; desde otras páginas hay que volver a la raíz.
export const getSectionHref = (id: SectionId, fromHome: boolean) => (fromHome ? `#${id}` : `/#${id}`);
