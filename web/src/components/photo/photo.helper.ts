import type { PhotoRatio, PhotoTone } from './photo.const';

export const getPhotoClassName = (
  styles: Record<string, string>,
  { ratio, tone, zoomed, className }: { ratio: PhotoRatio; tone: PhotoTone; zoomed?: boolean; className?: string },
) => [styles.photo, styles[ratio], styles[tone], zoomed && styles.zoomed, className].filter(Boolean).join(' ');
