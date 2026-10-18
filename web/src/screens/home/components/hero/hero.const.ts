export const HERO_TITLE_ID = 'portada-titulo';

export const HERO_MESSAGES = {
  title: 'brand.nameWithSlogan',
  intro: 'hero.intro',
  ctaCatalog: 'hero.ctaCatalog',
  ctaDirections: 'hero.ctaDirections',
  today: 'hero.today',
  where: 'hero.where',
  address: 'hero.address',
  photoAlt: 'hero.photoAlt',
} as const;

// Ancho que ocupa la foto: 7/12 de la rejilla en escritorio, todo el ancho en móvil.
export const HERO_PHOTO_SIZES = '(min-width: 1024px) 50vw, 100vw';
