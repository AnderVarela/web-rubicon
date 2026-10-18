import { TagTone } from '@components/tag';

export const PRODUCT_CARD_MESSAGES = { label: 'product.cardLabel' } as const;

export const NO_TAG = 'none';

// Color de cada etiqueta según el diseño; el resto, tono neutro.
export const TAG_TONES: Record<string, TagTone> = {
  Novedad: TagTone.NEW,
  'De temporada': TagTone.SEASONAL,
  'Solo fines de semana': TagTone.WEEKEND,
};
