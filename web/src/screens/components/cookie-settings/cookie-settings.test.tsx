import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, t } from '@test/render-with-providers';
import { CONSENT_STORAGE_KEY, ConsentChoice } from '@hooks/use-consent';
import { CookieBanner } from '@screens/components/cookie-banner';
import { CookieSettings } from './cookie-settings';

const renderConsent = () =>
  renderWithProviders(
    <>
      <CookieBanner />
      <CookieSettings />
    </>,
  );

describe('CookieSettings', () => {
  it('desde el banner, el visitante activa solo los mapas y guarda su elección', async () => {
    const user = userEvent.setup();
    renderConsent();

    await user.click(screen.getByRole('button', { name: t('cookies.settings') }));
    const dialog = screen.getByRole('dialog', { name: t('cookies.dialogTitle') });
    expect(screen.queryByRole('region', { name: t('cookies.region') })).not.toBeInTheDocument();

    const maps = within(dialog).getByRole('switch', { name: t('cookies.maps') });
    expect(maps).not.toBeChecked();
    await user.click(maps);
    await user.click(within(dialog).getByRole('button', { name: t('cookies.save') }));

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).toBe(ConsentChoice.ALL);
  });

  it('al cerrar sin guardar vuelve a mostrar el banner porque aún no hay elección', async () => {
    const user = userEvent.setup();
    renderConsent();

    await user.click(screen.getByRole('button', { name: t('cookies.settings') }));
    await user.keyboard('{Escape}');

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(screen.getByRole('region', { name: t('cookies.region') })).toBeInTheDocument();
    expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).toBeNull();
  });
});
