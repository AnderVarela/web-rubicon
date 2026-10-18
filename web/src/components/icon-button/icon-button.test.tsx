import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, t } from '@test/render-with-providers';
import { IconName } from '@components/icon';
import { IconButton } from './icon-button';

describe('IconButton', () => {
  it('cierra algo cuando el usuario pulsa el botón que solo muestra una X', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderWithProviders(<IconButton icon={IconName.CLOSE} label={t('common.close')} onClick={onClick} />);

    await user.click(screen.getByRole('button', { name: t('common.close') }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('enlaza a una red social en otra pestaña y no reacciona desactivado', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderWithProviders(
      <>
        <IconButton icon={IconName.INSTAGRAM} label={t('common.menu')} href="https://instagram.com/x" external />
        <IconButton icon={IconName.CHEVRON_LEFT} label={t('common.close')} disabled onClick={onClick} />
      </>,
    );

    expect(screen.getByRole('link', { name: t('common.menu') })).toHaveAttribute('target', '_blank');
    await user.click(screen.getByRole('button', { name: t('common.close') }));
    expect(onClick).not.toHaveBeenCalled();
  });
});
