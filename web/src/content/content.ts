import web from '@contenido/web.json';
import type { Contenido } from './content.types';
import { buildPhotoResolver } from './content.helper';

// La web solo pinta lo que hay en contenido/web.json; no hace ninguna llamada.
export const CONTENT = web as unknown as Contenido;

const photoFiles = import.meta.glob<string>('@contenido/imagenes/**/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
});

export const resolvePhoto = buildPhotoResolver(photoFiles);
