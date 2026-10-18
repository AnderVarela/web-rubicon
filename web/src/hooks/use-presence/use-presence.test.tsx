import { useState } from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, t } from '@test/render-with-providers';
import { Button } from '@components/button';
import { Dialog } from '@components/dialog';

const Harness = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen((value) => !value)}>{t('common.menu')}</Button>
      <Dialog open={open} onClose={() => setOpen(false)} label={t('brand.name')} backdrop={false}>
        <Button onClick={() => setOpen(false)}>{t('common.close')}</Button>
      </Dialog>
    </>
  );
};

describe('usePresence', () => {
  it('mantiene el panel en pantalla mientras sale y lo retira al terminar', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Harness />);

    await user.click(screen.getByRole('button', { name: t('common.menu') }));
    await user.click(screen.getByRole('button', { name: t('common.close') }));

    expect(screen.getByRole('dialog', { name: t('brand.name') })).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('no monta nada mientras el panel está cerrado', () => {
    renderWithProviders(<Harness />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
