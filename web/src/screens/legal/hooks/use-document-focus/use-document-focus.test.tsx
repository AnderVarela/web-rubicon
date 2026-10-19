import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, t } from '@test/render-with-providers';
import { Router } from '@/app/router';

describe('useDocumentFocus', () => {
  it('lleva el foco al documento nuevo al cambiar de página legal', async () => {
    const user = userEvent.setup();
    window.history.replaceState(null, '', '/cookies/');
    renderWithProviders(<Router />);
    const nav = screen.getByRole('navigation', { name: t('legal.navLabel') });

    await user.click(screen.getAllByRole('link', { name: t('legal.privacy') }).find((link) => nav.contains(link))!);

    expect(screen.getByRole('main')).toHaveFocus();
    expect(document.title).toBe(t('legal.pageTitle', { title: t('legal.privacy.title') }));
  });

  it('en la primera carga no mueve el foco', () => {
    window.history.replaceState(null, '', '/cookies/');
    renderWithProviders(<Router />);

    expect(screen.getByRole('main')).not.toHaveFocus();
  });
});
