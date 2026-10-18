import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, t } from '@test/render-with-providers';
import { IconName } from '@components/icon';
import { Button } from './button';

describe('Button', () => {
  it('ejecuta la acción al pulsarlo con el ratón o con el teclado', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderWithProviders(
      <Button icon={IconName.MENU} onClick={onClick}>
        {t('common.menu')}
      </Button>,
    );

    const button = screen.getByRole('button', { name: t('common.menu') });
    await user.click(button);
    await user.tab();
    await user.tab({ shift: true });
    await user.keyboard('{Enter}');

    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('se convierte en un enlace seguro a otra pestaña cuando lleva a una web externa, y no actúa si está desactivado', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderWithProviders(
      <>
        <Button href="https://wa.me/34634187747" external>
          {t('common.menu')}
        </Button>
        <Button disabled onClick={onClick}>
          {t('common.close')}
        </Button>
      </>,
    );

    const link = screen.getByRole('link', { name: t('common.menu') });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');

    await user.click(screen.getByRole('button', { name: t('common.close') }));
    expect(onClick).not.toHaveBeenCalled();
  });
});
