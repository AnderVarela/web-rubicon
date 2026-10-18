import { screen, within } from '@testing-library/react';
import { renderWithProviders, t } from '@test/render-with-providers';
import { CONTENT } from '@/content';
import { Reviews } from './reviews';

describe('Reviews', () => {
  it('muestra la valoración de Google, las reseñas elegidas y cómo escribir una', () => {
    renderWithProviders(<Reviews />);

    expect(screen.getByRole('heading', { level: 2, name: t('reviews.title') })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: t('common.rating', { rating: '4,8' }) })).toBeInTheDocument();
    expect(screen.getByText(t('reviews.total', { total: CONTENT.resenas.total }))).toBeInTheDocument();
    expect(screen.getByRole('link', { name: t('reviews.write') })).toHaveAttribute('href', CONTENT.resenas.urlEscribir);

    const list = screen.getByRole('list', { name: t('reviews.list') });
    expect(within(list).getAllByRole('article')).toHaveLength(CONTENT.resenas.lista.length);
  });

  it('sin reseñas elegidas ni valoración, solo invita a escribir la primera', () => {
    const original = CONTENT.resenas;
    CONTENT.resenas = { ...original, valoracion: null, lista: [] };
    renderWithProviders(<Reviews />);

    expect(screen.getByText(t('reviews.empty'))).toBeInTheDocument();
    expect(screen.queryByRole('list', { name: t('reviews.list') })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: t('reviews.write') })).toBeInTheDocument();
    CONTENT.resenas = original;
  });
});
