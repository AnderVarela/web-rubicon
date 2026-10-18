import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, t } from '@test/render-with-providers';
import { CookieSettings } from '@screens/components/cookie-settings';
import { LegalNav } from './legal-nav';

describe('LegalNav', () => {
  it('enlaza a cada página legal con su propia dirección', () => {
    renderWithProviders(<LegalNav />);

    expect(screen.getByRole('link', { name: t('legal.notice') })).toHaveAttribute('href', '/aviso-legal/');
    expect(screen.getByRole('link', { name: t('legal.privacy') })).toHaveAttribute('href', '/privacidad/');
    expect(screen.getByRole('link', { name: t('legal.cookies') })).toHaveAttribute('href', '/cookies/');
    expect(screen.getByRole('link', { name: t('legal.accessibility') })).toHaveAttribute('href', '/accesibilidad/');
  });

  it('vuelve a abrir la configuración de cookies desde el pie', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <>
        <LegalNav />
        <CookieSettings />
      </>,
    );

    await user.click(screen.getByRole('button', { name: t('cookies.configure') }));

    expect(screen.getByRole('dialog', { name: t('cookies.dialogTitle') })).toBeInTheDocument();
  });
});
