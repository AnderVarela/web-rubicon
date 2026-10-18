import { screen } from '@testing-library/react';
import { renderWithProviders, t } from '@test/render-with-providers';
import { Router } from './router';

describe('Router', () => {
  it('abre la portada o la página legal según la dirección', () => {
    const { unmount } = renderWithProviders(<Router pathname="/" />);
    expect(screen.getByRole('heading', { level: 1, name: t('brand.nameWithSlogan') })).toBeInTheDocument();
    unmount();

    renderWithProviders(<Router pathname="/privacidad" />);
    expect(screen.getByRole('heading', { level: 1, name: t('legal.privacy.title') })).toBeInTheDocument();
  });

  it('muestra la página 404 para cualquier dirección que no existe', () => {
    renderWithProviders(<Router pathname="/tienda-online/" />);

    expect(screen.getByRole('heading', { level: 1, name: t('notFound.title') })).toBeInTheDocument();
  });
});
