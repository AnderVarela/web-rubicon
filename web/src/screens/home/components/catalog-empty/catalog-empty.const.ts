import { IconName } from '@components/icon';

export const CATALOG_EMPTY_MESSAGES = {
  label: 'catalog.soon.label',
  title: 'catalog.soon.title',
  text: 'catalog.soon.text',
  whatsapp: 'catalog.soon.whatsapp',
  call: 'catalog.soon.call',
  slot: 'catalog.soon.slot',
} as const;

export interface ShelfSlot {
  icon: IconName;
  number: number;
  raised: boolean;
}

// Estantería decorativa: tres huecos vacíos, el del centro algo más bajo.
export const SHELF_SLOTS: ShelfSlot[] = [
  { icon: IconName.WHEAT, number: 1, raised: false },
  { icon: IconName.COOKIE, number: 2, raised: true },
  { icon: IconName.WHEAT, number: 3, raised: false },
];
