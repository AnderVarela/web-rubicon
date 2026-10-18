import { IconName } from '@components/icon';
import type { Alergeno } from '@/content';

// El icono de cada alérgeno lo elige la web (web.json solo trae el nombre).
export const ALLERGEN_ICONS: Record<Alergeno, IconName> = {
  Gluten: IconName.WHEAT,
  Crustáceos: IconName.SHRIMP,
  Huevos: IconName.EGG,
  Pescado: IconName.FISH,
  Cacahuetes: IconName.BEAN,
  Soja: IconName.SPROUT,
  Leche: IconName.MILK,
  'Frutos de cáscara': IconName.NUT,
  Apio: IconName.LEAFY_GREEN,
  Mostaza: IconName.DROPLET,
  Sésamo: IconName.SESAME,
  Sulfitos: IconName.WINE,
  Altramuces: IconName.FLOWER,
  Moluscos: IconName.SHELL,
};

export const ALLERGEN_LIST_MESSAGES = { empty: 'product.noAllergens' } as const;
