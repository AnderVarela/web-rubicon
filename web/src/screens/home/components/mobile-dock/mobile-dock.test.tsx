import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, t } from '@test/render-with-providers';
import { SectionId } from '@screens/components/section-nav';
import { MobileDock } from './mobile-dock';

describe('MobileDock', () => {
  it('dice en qué sección está el usuario y abre el menú', async () => {
    const user = userEvent.setup();
    const onOpenMenu = vi.fn();
    renderWithProviders(<MobileDock activeId={SectionId.VISIT} menuOpen={false} onOpenMenu={onOpenMenu} />);

    const dock = screen.getByRole('navigation', { name: t('dock.label') });
    expect(within(dock).getByText(t('nav.visit'))).toBeInTheDocument();

    const menu = within(dock).getByRole('button', { name: t('menu.open') });
    expect(menu).toHaveAttribute('aria-expanded', 'false');
    await user.click(menu);
    expect(onOpenMenu).toHaveBeenCalledTimes(1);
  });

  it('en la portada muestra «Inicio» y permite volver arriba', () => {
    renderWithProviders(<MobileDock activeId={SectionId.HOME} menuOpen onOpenMenu={vi.fn()} />);

    expect(screen.getByText(t('nav.home'))).toBeInTheDocument();
    expect(screen.getByRole('link', { name: t('nav.homeLink') })).toHaveAttribute('href', '#inicio');
    expect(screen.getByRole('button', { name: t('menu.open') })).toHaveAttribute('aria-expanded', 'true');
  });
});
