import type { FotoPath } from './content.types';

const PHOTO_ROOT = 'imagenes/';

// Convierte la ruta de web.json («imagenes/productos/x.jpg») en la URL que genera Vite.
export const buildPhotoResolver = (files: Record<string, string>) => {
  const byPath = new Map(
    Object.entries(files).map(([file, url]) => [file.slice(file.indexOf(PHOTO_ROOT)), url]),
  );
  return (photo: FotoPath): string | null => (photo ? (byPath.get(photo) ?? null) : null);
};
