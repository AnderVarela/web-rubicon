import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, t } from '@test/render-with-providers';
import { CONTENT, type Aviso } from '@/content';
import { Home } from './home';

const withNotice = (aviso: Aviso | null) => {
  const original = CONTENT.aviso;
  CONTENT.aviso = aviso;
  return () => {
    CONTENT.aviso = original;
  };
};

describe('Home', () => {
  it('en móvil, el visitante abre el menú, salta a «Nosotros» y vuelve a la página', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Home />);

    expect(screen.getByRole('heading', { level: 1, name: t('brand.nameWithSlogan') })).toBeInTheDocument();
    const menuButton = screen.getByRole('button', { name: t('menu.open') });
    await user.click(menuButton);

    const menu = screen.getByRole('dialog', { name: t('menu.label') });
    await user.click(within(menu).getByRole('link', { name: new RegExp(t('nav.about')) }));

    expect(window.location.hash).toBe('#nosotros');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(menuButton).toHaveFocus();
  });

  it('muestra el aviso vigente, deja cerrarlo y no enseña los avisos caducados', async () => {
    const user = userEvent.setup();
    const restore = withNotice({ texto: 'Cerramos por vacaciones del 1 al 15 de agosto.', hasta: '2999-12-31' });
    const { unmount } = renderWithProviders(<Home />);

    expect(screen.getByRole('status')).toHaveTextContent('Cerramos por vacaciones');
    await user.click(screen.getByRole('button', { name: t('notice.close') }));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    unmount();

    withNotice({ texto: 'Aviso antiguo', hasta: '2000-01-01' });
    renderWithProviders(<Home />);
    expect(screen.queryByText('Aviso antiguo')).not.toBeInTheDocument();
    restore();
  });
});
