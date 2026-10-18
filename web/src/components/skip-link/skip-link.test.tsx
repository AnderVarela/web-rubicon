import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, t } from '@test/render-with-providers';
import { SkipLink } from './skip-link';

describe('SkipLink', () => {
  it('es lo primero que encuentra quien navega con teclado y lleva al contenido', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <>
        <SkipLink targetId="contenido" label={t('common.menu')} />
        <a href="#otra">{t('brand.name')}</a>
        <main id="contenido" />
      </>,
    );

    await user.tab();
    const link = screen.getByRole('link', { name: t('common.menu') });
    expect(link).toHaveFocus();

    await user.keyboard('{Enter}');
    expect(window.location.hash).toBe('#contenido');
  });

  it('apunta al identificador indicado aunque el contenido aún no exista', () => {
    renderWithProviders(<SkipLink targetId="legal" label={t('common.menu')} />);

    expect(screen.getByRole('link', { name: t('common.menu') })).toHaveAttribute('href', '#legal');
  });
});
