import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, t } from '@test/render-with-providers';
import { Chip } from './chip';

describe('Chip', () => {
  it('lleva al usuario a una categoría al pulsarlo', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderWithProviders(<Chip label={t('brand.name')} count={6} onClick={onClick} />);

    await user.click(screen.getByRole('button', { name: `${t('brand.name')} 6` }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('salta a la sección de la categoría cuando es un enlace', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Chip label={t('common.menu')} count={27} href="#catalogo-palmeritas" />);

    await user.click(screen.getByRole('link', { name: `${t('common.menu')} 27` }));

    expect(window.location.hash).toBe('#catalogo-palmeritas');
  });

  it('funciona como pestaña e indica cuál está seleccionada', () => {
    renderWithProviders(
      <div role="tablist">
        <Chip role="tab" label={t('brand.name')} selected />
        <Chip role="tab" label={t('common.menu')} />
      </div>,
    );

    expect(screen.getByRole('tab', { name: t('brand.name') })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: t('common.menu') })).toHaveAttribute('aria-selected', 'false');
  });
});
