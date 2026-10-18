import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, t } from '@test/render-with-providers';
import { CONTENT } from '@/content';
import { SectionId } from '@screens/components/section-nav';
import { MobileMenu } from './mobile-menu';

describe('MobileMenu', () => {
  it('lleva a una sección, ofrece llamar o escribir y se cierra al elegir', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    renderWithProviders(<MobileMenu open activeId={SectionId.CATALOG} onClose={onClose} />);

    const menu = screen.getByRole('dialog', { name: t('menu.label') });
    expect(within(menu).getByRole('button', { name: t('menu.closeLabel') })).toHaveFocus();
    expect(within(menu).getByRole('link', { name: t('menu.call') })).toHaveAttribute('href', CONTENT.contacto.telefono.enlace);
    expect(within(menu).getByRole('link', { name: t('menu.whatsapp') })).toHaveAttribute('href', CONTENT.contacto.whatsapp.enlace);

    await user.click(within(menu).getByRole('link', { name: new RegExp(t('nav.about')) }));
    expect(onClose).toHaveBeenCalled();
  });

  it('se cierra con Escape o con el botón de cerrar', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    renderWithProviders(<MobileMenu open activeId={SectionId.HOME} onClose={onClose} />);

    await user.keyboard('{Escape}');
    await user.click(screen.getByRole('button', { name: t('menu.closeLabel') }));

    expect(onClose).toHaveBeenCalledTimes(2);
  });
});
