import { useState } from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, t } from '@test/render-with-providers';
import { Button } from '@components/button';
import { Dialog } from '@components/dialog';

const Harness = ({ withActions }: { withActions: boolean }) => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button>{t('common.menu')}</Button>
      <Dialog open={open} onClose={() => setOpen(false)} label={t('brand.name')}>
        {withActions ? <Button>{t('common.close')}</Button> : <p>{t('brand.nameWithSlogan')}</p>}
      </Dialog>
    </>
  );
};

describe('useFocusTrap', () => {
  it('no deja salir con Tab ni con Mayús+Tab de un diálogo abierto', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Harness withActions />);
    const inside = screen.getByRole('button', { name: t('common.close') });

    await user.tab();
    expect(inside).toHaveFocus();
    await user.tab({ shift: true });
    expect(inside).toHaveFocus();
  });

  it('enfoca el propio diálogo cuando no tiene nada que se pueda enfocar', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Harness withActions={false} />);

    await user.tab();
    expect(screen.getByRole('dialog', { name: t('brand.name') })).toHaveFocus();
  });
});
