import { useState } from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, t } from '@test/render-with-providers';
import { Button } from '@components/button';
import { Dialog } from '@components/dialog';
import { MEDIA_REDUCED_MOTION } from '@hooks/use-media-query';

const Harness = () => {
  const [open, setOpen] = useState(true);
  return (
    <Dialog open={open} onClose={() => setOpen(false)} label={t('brand.name')}>
      <Button onClick={() => setOpen(false)}>{t('common.close')}</Button>
    </Dialog>
  );
};

const mockReducedMotion = (reduce: boolean) =>
  vi.spyOn(window, 'matchMedia').mockImplementation(
    (query) =>
      ({
        matches: reduce && query === MEDIA_REDUCED_MOTION,
        media: query,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
      }) as unknown as MediaQueryList,
  );

describe('useReducedMotion', () => {
  it('quita el panel al instante si el usuario prefiere menos movimiento', async () => {
    mockReducedMotion(true);
    const user = userEvent.setup();
    renderWithProviders(<Harness />);

    await user.click(screen.getByRole('button', { name: t('common.close') }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('deja que el panel salga animado si no hay preferencia', async () => {
    mockReducedMotion(false);
    const user = userEvent.setup();
    renderWithProviders(<Harness />);

    await user.click(screen.getByRole('button', { name: t('common.close') }));

    expect(screen.getByRole('dialog', { name: t('brand.name') })).toBeInTheDocument();
  });
});
