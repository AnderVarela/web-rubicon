import type { Categoria, Producto } from '@/content';
import { CATALOG_MESSAGES } from './catalog.const';

export const findCategoryName = (catalogo: Categoria[], product: Producto | null) =>
  catalogo.find((categoria) => product && categoria.productos.includes(product))?.nombre ?? '';

export const getIntroMessage = (catalogo: Categoria[]) => (catalogo.length ? CATALOG_MESSAGES.intro : CATALOG_MESSAGES.introEmpty);
