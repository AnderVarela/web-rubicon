import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, t } from '@test/render-with-providers';
import { NoticeBar } from './notice-bar';

const TEXT = 'Del 1 al 15 de agosto cerramos por vacaciones.';

describe('NoticeBar', () => {
  it('anuncia el aviso de la tienda y deja cerrarlo', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    renderWithProviders(<NoticeBar text={TEXT} onClose={onClose} />);

    expect(screen.getByRole('status')).toHaveTextContent(TEXT);
    await user.click(screen.getByRole('button', { name: t('notice.close') }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('se puede cerrar también con el teclado', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    renderWithProviders(<NoticeBar text={TEXT} onClose={onClose} />);

    await user.tab();
    await user.keyboard('{Enter}');

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
