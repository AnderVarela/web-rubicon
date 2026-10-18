import { MAX_STARS } from './star-rating.const';

// Estrellas llenas redondeando al entero más cercano (4,8 → 5).
export const getStars = (value: number): boolean[] => {
  const filled = Math.min(MAX_STARS, Math.max(0, Math.round(value)));
  return Array.from({ length: MAX_STARS }, (_, index) => index < filled);
};
