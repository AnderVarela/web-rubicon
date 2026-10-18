export enum SectionId {
  HOME = 'inicio',
  CATALOG = 'catalogo',
  ABOUT = 'nosotros',
  REVIEWS = 'resenas',
  VISIT = 'visitanos',
}

export interface NavItem {
  id: SectionId;
  messageId: string;
  number: string;
}

// Secciones del menú, en el orden de la página.
export const NAV_ITEMS: NavItem[] = [
  { id: SectionId.CATALOG, messageId: 'nav.catalog', number: '01' },
  { id: SectionId.ABOUT, messageId: 'nav.about', number: '02' },
  { id: SectionId.REVIEWS, messageId: 'nav.reviews', number: '03' },
  { id: SectionId.VISIT, messageId: 'nav.visit', number: '04' },
];

export const HOME_NAV_ITEM: NavItem = { id: SectionId.HOME, messageId: 'nav.home', number: '—' };

export enum SectionNavVariant {
  HEADER = 'header',
  FOOTER = 'footer',
  MENU = 'menu',
}

export const SECTION_NAV_MESSAGES = {
  label: 'nav.label',
  here: 'nav.here',
} as const;

export const ARIA_CURRENT_LOCATION = 'location';
