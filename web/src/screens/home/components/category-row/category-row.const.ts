export const CATEGORY_ROW_MESSAGES = {
  count: 'catalog.count',
  previous: 'catalog.previous',
  next: 'catalog.next',
  region: 'catalog.region',
} as const;

export const CATEGORY_ANCHOR_PREFIX = 'catalogo-';

// Separación entre tarjetas y margen que se descuenta al calcular cuántas caben.
export const CARD_GAP = 20;
export const ROW_EDGE_ALLOWANCE = 40;

export enum ScrollDirection {
  BACK = -1,
  FORWARD = 1,
}

export const KEY_NEXT = 'ArrowRight';
export const KEY_PREVIOUS = 'ArrowLeft';
