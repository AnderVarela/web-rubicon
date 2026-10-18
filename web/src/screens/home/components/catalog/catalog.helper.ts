import type { Categoria, Producto } from '@/content';

export const findCategoryName = (catalogo: Categoria[], product: Producto | null) =>
  catalogo.find((categoria) => product && categoria.productos.includes(product))?.nombre ?? '';
