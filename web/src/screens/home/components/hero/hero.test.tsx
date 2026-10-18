import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, t } from '@test/render-with-providers';
import { CONTENT } from '@/content';
import { Hero } from './hero';

describe('Hero', () => {
  it('presenta la panadería y lleva al catálogo con el botón principal', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Hero />);

    expect(screen.getByRole('heading', { level: 1, name: t('brand.nameWithSlogan') })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: t('brand.nameWithSlogan') })).toHaveAttribute('id', 'inicio');
    expect(screen.getByText(CONTENT.portada.linea)).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: t('hero.ctaCatalog') }));
    expect(window.location.hash).toBe('#catalogo');
  });

  it('abre la ruta en la app de mapas en otra pestaña y muestra la dirección', () => {
    renderWithProviders(<Hero />);

    const directions = screen.getByRole('link', { name: t('hero.ctaDirections') });
    expect(directions).toHaveAttribute('href', CONTENT.contacto.urlComoLlegar);
    expect(directions).toHaveAttribute('target', '_blank');
    expect(
      screen.getByText(t('hero.address', { address: CONTENT.contacto.direccion, town: CONTENT.contacto.localidad })),
    ).toBeInTheDocument();
    expect(screen.getByRole('img', { name: t('hero.photoAlt') })).toBeInTheDocument();
  });
});
