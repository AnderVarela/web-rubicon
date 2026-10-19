import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, t } from '@test/render-with-providers';
import { Router } from '@/app/router';

describe('usePathname', () => {
  it('cambia de documento legal sin recargar y conserva el idioma de la dirección', async () => {
    const user = userEvent.setup();
    window.history.replaceState(null, '', '/privacidad/?lang=en');
    renderWithProviders(<Router />);
    const header = screen.getByRole('banner');

    await user.click(within(screen.getByRole('navigation', { name: t('legal.navLabel') })).getByRole('link', { name: t('legal.cookies') }));

    expect(screen.getByRole('heading', { level: 1, name: t('legal.cookies.title') })).toBeInTheDocument();
    expect(window.location.pathname).toBe('/cookies/');
    expect(window.location.search).toBe('?lang=en');
    // La misma web sigue montada: no hubo recarga.
    expect(screen.getByRole('banner')).toBe(header);
  });

  it('con el botón Atrás vuelve al documento anterior', async () => {
    const user = userEvent.setup();
    window.history.replaceState(null, '', '/aviso-legal/');
    renderWithProviders(<Router />);

    await user.click(within(screen.getByRole('contentinfo')).getByRole('link', { name: t('legal.accessibility') }));
    expect(screen.getByRole('heading', { level: 1, name: t('legal.accessibility.title') })).toBeInTheDocument();

    window.history.back();

    await waitFor(() => expect(screen.getByRole('heading', { level: 1, name: t('legal.notice.title') })).toBeInTheDocument());
  });
});
