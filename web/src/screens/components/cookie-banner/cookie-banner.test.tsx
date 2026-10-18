import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, t } from '@test/render-with-providers';
import { CONSENT_STORAGE_KEY, ConsentChoice } from '@hooks/use-consent';
import { CookieBanner } from './cookie-banner';

describe('CookieBanner', () => {
  it('aparece en la primera visita y recuerda que se aceptaron los mapas', async () => {
    const user = userEvent.setup();
    renderWithProviders(<CookieBanner />);

    const banner = screen.getByRole('region', { name: t('cookies.region') });
    expect(screen.getByRole('link', { name: t('cookies.policy') })).toHaveAttribute('href', '/cookies/');
    await user.click(screen.getByRole('button', { name: t('cookies.accept') }));

    expect(banner).not.toBeInTheDocument();
    expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).toBe(ConsentChoice.ALL);
  });

  it('permite rechazar con un solo clic y no vuelve a preguntar', async () => {
    const user = userEvent.setup();
    const { unmount } = renderWithProviders(<CookieBanner />);

    await user.click(screen.getByRole('button', { name: t('cookies.reject') }));
    expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).toBe(ConsentChoice.TECHNICAL);
    unmount();

    renderWithProviders(<CookieBanner />);
    expect(screen.queryByRole('region', { name: t('cookies.region') })).not.toBeInTheDocument();
  });
});
