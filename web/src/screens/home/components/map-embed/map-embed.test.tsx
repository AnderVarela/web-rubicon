import { act, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, t } from '@test/render-with-providers';
import { CONTENT } from '@/content';
import { CONSENT_STORAGE_KEY, ConsentChoice, consentStore } from '@hooks/use-consent';
import { MapEmbed } from './map-embed';
import { MAP_LOAD_TIMEOUT_MS } from './map-embed.const';

const allowMaps = () => {
  window.localStorage.setItem(CONSENT_STORAGE_KEY, ConsentChoice.ALL);
  consentStore.reset();
};

describe('MapEmbed', () => {
  afterEach(() => vi.useRealTimers());

  it('no carga Google Maps hasta que el visitante lo pide, y lo muestra cuando termina de cargar', async () => {
    const user = userEvent.setup();
    renderWithProviders(<MapEmbed />);

    expect(screen.queryByTitle(t('map.title'))).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: t('map.open') })).toHaveAttribute('href', CONTENT.contacto.urlComoLlegar);

    await user.click(screen.getByRole('button', { name: t('map.load') }));
    const map = screen.getByTitle(t('map.title'));
    expect(map).toHaveAttribute('src', CONTENT.contacto.urlMapa);
    expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).toBe(ConsentChoice.ALL);

    fireEvent.load(map);
    expect(screen.getByText(t('map.loaded'))).toBeInTheDocument();
  });

  it('si Google no responde, avisa y ofrece abrir el mapa en Google Maps', () => {
    vi.useFakeTimers();
    allowMaps();
    renderWithProviders(<MapEmbed />);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();

    act(() => vi.advanceTimersByTime(MAP_LOAD_TIMEOUT_MS));

    expect(screen.getByRole('status')).toHaveTextContent(t('map.failed'));
    expect(screen.getByRole('link', { name: t('map.open') })).toHaveAttribute('target', '_blank');
  });

  it('quita el aviso si el mapa acaba cargando tarde', () => {
    vi.useFakeTimers();
    allowMaps();
    renderWithProviders(<MapEmbed />);

    act(() => vi.advanceTimersByTime(MAP_LOAD_TIMEOUT_MS));
    fireEvent.load(screen.getByTitle(t('map.title')));

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
