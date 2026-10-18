import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, t } from '@test/render-with-providers';
import { CONTENT } from '@/content';
import { ReviewCard } from './review-card';

const NOW = new Date('2026-10-18T12:00:00Z');
const [marta, javier] = CONTENT.resenas.lista;

describe('ReviewCard', () => {
  it('despliega una reseña larga con «Leer más» y la vuelve a recoger', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <ul>
        <ReviewCard review={javier} now={NOW} />
      </ul>,
    );

    const toggle = screen.getByRole('button', { name: t('reviews.more') });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await user.click(toggle);
    expect(screen.getByRole('button', { name: t('reviews.less') })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('img', { name: t('common.rating', { rating: 4 }) })).toBeInTheDocument();
    expect(screen.getByText('hace 1 mes')).toBeInTheDocument();
  });

  it('no ofrece «Leer más» en una reseña corta y muestra su autor y antigüedad', () => {
    renderWithProviders(
      <ul>
        <ReviewCard review={marta} now={NOW} />
      </ul>,
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByText(marta.autor)).toBeInTheDocument();
    expect(screen.getByText('hace 2 semanas')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: t('reviews.google') })).toBeInTheDocument();
  });
});
