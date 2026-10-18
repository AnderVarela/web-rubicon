import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, t } from '@test/render-with-providers';
import { ScrollRow } from './scroll-row';

describe('ScrollRow', () => {
  it('se puede alcanzar con el teclado y responde a las flechas para desplazarse', async () => {
    const user = userEvent.setup();
    const onKeyDown = vi.fn();
    renderWithProviders(
      <ScrollRow role="region" label={t('brand.name')} focusable onKeyDown={onKeyDown}>
        <span>{t('common.menu')}</span>
      </ScrollRow>,
    );

    await user.tab();
    expect(screen.getByRole('region', { name: t('brand.name') })).toHaveFocus();

    await user.keyboard('{ArrowRight}');
    expect(onKeyDown).toHaveBeenCalled();
  });

  it('funciona como lista sin ser una parada de tabulación más cuando no hace falta', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <ScrollRow role="list" label={t('brand.name')}>
        <span role="listitem">{t('common.menu')}</span>
      </ScrollRow>,
    );

    await user.tab();
    expect(screen.getByRole('list', { name: t('brand.name') })).not.toHaveFocus();
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });
});
