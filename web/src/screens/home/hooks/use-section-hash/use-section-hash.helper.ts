import { SectionId } from '@screens/components/section-nav';

// En la portada la URL va sin ancla; en el resto de secciones, con la suya.
export const getSectionUrl = (id: SectionId, location: Pick<Location, 'pathname' | 'search'>) =>
  id === SectionId.HOME ? `${location.pathname}${location.search}` : `#${id}`;

export const getSectionHash = (id: SectionId) => (id === SectionId.HOME ? '' : `#${id}`);
