import type { PhotoRatio, PhotoTone } from './photo.const';

export const getPhotoClassName = (
  styles: Record<string, string>,
  { ratio, tone, zoomed, className }: { ratio: PhotoRatio; tone: PhotoTone; zoomed?: boolean; className?: string },
) => [styles.photo, styles[ratio], styles[tone], zoomed && styles.zoomed, className].filter(Boolean).join(' ');

// Convierte las variantes que genera vite-imagetools en fuentes de <picture>, de la más ligera a la más compatible.
const FORMAT_ORDER = ['avif', 'webp', 'jpeg', 'jpg', 'png'];

export const toPhotoSources = (sources: Record<string, string>) =>
  Object.entries(sources)
    .sort(([a], [b]) => FORMAT_ORDER.indexOf(a) - FORMAT_ORDER.indexOf(b))
    .map(([format, srcSet]) => ({ type: `image/${format === 'jpg' ? 'jpeg' : format}`, srcSet }));
