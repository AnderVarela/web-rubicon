import { useState } from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, t } from '@test/render-with-providers';
import { Button } from '@components/button';
import { Dialog } from '@components/dialog';
import { SCROLL_LOCK_ATTRIBUTE } from './use-scroll-lock.const';

const Harness = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>{t('common.menu')}</Button>
      <Dialog open={open} onClose={() => setOpen(false)} label={t('brand.name')}>
        <Button onClick={() => setOpen(false)}>{t('common.close')}</Button>
      </Dialog>
    </>
  );
};

describe('useScrollLock', () => {
  it('impide desplazar la página mientras el panel está abierto y lo permite al cerrarlo', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Harness />);

    await user.click(screen.getByRole('button', { name: t('common.menu') }));
    expect(document.body).toHaveAttribute(SCROLL_LOCK_ATTRIBUTE, 'true');

    await user.click(screen.getByRole('button', { name: t('common.close') }));
    await waitFor(() => expect(document.body).not.toHaveAttribute(SCROLL_LOCK_ATTRIBUTE));
  });

  it('no bloquea nada mientras no se abre ningún panel', () => {
    renderWithProviders(<Harness />);

    expect(document.body).not.toHaveAttribute(SCROLL_LOCK_ATTRIBUTE);
  });
});
