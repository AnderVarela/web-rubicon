import { useState } from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, t } from '@test/render-with-providers';
import { Button } from '@components/button';
import { Dialog } from './dialog';
import { DialogPlacement } from './dialog.const';

const Harness = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>{t('common.menu')}</Button>
      <Dialog open={open} onClose={() => setOpen(false)} label={t('brand.name')} placement={DialogPlacement.SIDE}>
        <Button onClick={() => setOpen(false)}>{t('common.close')}</Button>
        <a href="#inicio">{t('brand.nameWithSlogan')}</a>
      </Dialog>
    </>
  );
};

describe('Dialog', () => {
  it('abre el panel, mantiene el foco dentro y lo devuelve al botón al cerrar', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Harness />);
    const opener = screen.getByRole('button', { name: t('common.menu') });

    await user.click(opener);
    const dialog = screen.getByRole('dialog', { name: t('brand.name') });
    const close = screen.getByRole('button', { name: t('common.close') });
    expect(close).toHaveFocus();
    expect(document.body).toHaveAttribute('data-scroll-lock', 'true');

    await user.tab();
    expect(screen.getByRole('link', { name: t('brand.nameWithSlogan') })).toHaveFocus();
    await user.tab();
    expect(close).toHaveFocus();
    expect(dialog).toContainElement(document.activeElement as HTMLElement);

    await user.click(close);
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(opener).toHaveFocus();
    expect(document.body).not.toHaveAttribute('data-scroll-lock');
  });

  it('se cierra con Escape aunque el usuario esté en mitad del panel', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Harness />);

    await user.click(screen.getByRole('button', { name: t('common.menu') }));
    await user.tab();
    await user.keyboard('{Escape}');

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(screen.getByRole('button', { name: t('common.menu') })).toHaveFocus();
  });
});
