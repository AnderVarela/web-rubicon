import { screen } from '@testing-library/react';
import { renderWithProviders, t } from '@test/render-with-providers';
import { StarRating } from './star-rating';
import { StarRatingSize } from './star-rating.const';
import { getStars } from './star-rating.helper';

describe('StarRating', () => {
  it('anuncia la puntuación como una sola imagen con texto', () => {
    const label = t('common.rating', { rating: '4,8' });
    renderWithProviders(<StarRating value={4.8} label={label} size={StarRatingSize.M} />);

    expect(screen.getByRole('img', { name: label })).toBeInTheDocument();
    expect(getStars(4.8)).toEqual([true, true, true, true, true]);
  });

  it('no pinta estrellas de más ni de menos con valores fuera de rango', () => {
    renderWithProviders(<StarRating value={9} label={t('common.rating', { rating: '9' })} />);

    expect(getStars(9).filter(Boolean)).toHaveLength(5);
    expect(getStars(-1).filter(Boolean)).toHaveLength(0);
    expect(getStars(4)).toEqual([true, true, true, true, false]);
  });
});
