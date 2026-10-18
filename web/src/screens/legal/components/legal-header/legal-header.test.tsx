import { screen } from '@testing-library/react';
import { renderWithProviders, t } from '@test/render-with-providers';
import { LegalHeader } from './legal-header';

describe('LegalHeader', () => {
  it('permite volver a la web desde una página legal', () => {
    renderWithProviders(<LegalHeader />);

    expect(screen.getByRole('link', { name: t('legal.back') })).toHaveAttribute('href', '/');
  });

  it('muestra la marca como imagen con nombre', () => {
    renderWithProviders(<LegalHeader />);

    expect(screen.getByRole('img', { name: t('brand.name') })).toBeInTheDocument();
  });
});
