import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, t } from '@test/render-with-providers';
import { CONTENT } from '@/content';
import { CONSENT_STORAGE_KEY, ConsentChoice, consentStore } from '@hooks/use-consent';
import { MapEmbed } from './map-embed';

describe('MapEmbed', () => {
  it('no carga Google Maps hasta que el visitante lo pide, y entonces recuerda el permiso', async () => {
    const user = userEvent.setup();
    renderWithProviders(<MapEmbed />);

    expect(screen.queryByTitle(t('map.title'))).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: t('map.open') })).toHaveAttribute('href', CONTENT.contacto.urlComoLlegar);

    await user.click(screen.getByRole('button', { name: t('map.load') }));

    expect(screen.getByTitle(t('map.title'))).toHaveAttribute('src', CONTENT.contacto.urlMapa);
    expect(screen.getByText(t('map.loaded'))).toBeInTheDocument();
    expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).toBe(ConsentChoice.ALL);
  });

  it('muestra el mapa directamente si ya se aceptaron los mapas en otra visita', () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, ConsentChoice.ALL);
    consentStore.reset();
    renderWithProviders(<MapEmbed />);

    expect(screen.getByTitle(t('map.title'))).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: t('map.load') })).not.toBeInTheDocument();
  });
});
