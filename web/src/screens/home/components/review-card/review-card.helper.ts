import { DAYS_PER_MONTH, DAYS_PER_WEEK, DAYS_PER_YEAR, LONG_REVIEW_LENGTH, MS_PER_DAY } from './review-card.const';

export const isLongReview = (text: string) => text.length > LONG_REVIEW_LENGTH;

// Antigüedad de la reseña («hace 2 semanas»): lo único de las reseñas que calcula la web.
export const getReviewAge = (publishedAt: string, now: Date): { value: number; unit: Intl.RelativeTimeFormatUnit } => {
  const days = Math.max(0, Math.floor((now.getTime() - Date.parse(publishedAt)) / MS_PER_DAY));
  if (days < DAYS_PER_WEEK) return { value: -days, unit: 'day' };
  if (days < DAYS_PER_MONTH) return { value: -Math.floor(days / DAYS_PER_WEEK), unit: 'week' };
  if (days < DAYS_PER_YEAR) return { value: -Math.floor(days / DAYS_PER_MONTH), unit: 'month' };
  return { value: -Math.floor(days / DAYS_PER_YEAR), unit: 'year' };
};
