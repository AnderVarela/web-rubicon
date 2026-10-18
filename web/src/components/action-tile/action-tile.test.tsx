import { screen } from '@testing-library/react';
import { renderWithProviders, t } from '@test/render-with-providers';
import { IconName } from '@components/icon';
import { ActionTile } from './action-tile';

describe('ActionTile', () => {
  it('permite llamar a la tienda con un solo toque', () => {
    renderWithProviders(<ActionTile href="tel:+34634187747" icon={IconName.PHONE} label={t('common.menu')} />);

    expect(screen.getByRole('link', { name: t('common.menu') })).toHaveAttribute('href', 'tel:+34634187747');
  });

  it('abre las apps externas en otra pestaña', () => {
    renderWithProviders(<ActionTile href="https://wa.me/34634187747" icon={IconName.WHATSAPP} label={t('common.close')} external />);

    expect(screen.getByRole('link', { name: t('common.close') })).toHaveAttribute('target', '_blank');
  });
});
