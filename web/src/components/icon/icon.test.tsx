import { screen } from '@testing-library/react';
import { renderWithProviders, t } from '@test/render-with-providers';
import { Icon } from './icon';
import { IconName } from './icon.const';

describe('Icon', () => {
  it('se anuncia como imagen con nombre cuando transmite información', () => {
    renderWithProviders(<Icon name={IconName.GOOGLE} label={t('common.rating', { rating: '4,8' })} />);

    expect(screen.getByRole('img', { name: t('common.rating', { rating: '4,8' }) })).toBeInTheDocument();
  });

  it('queda oculto al lector de pantalla cuando es decorativo, también en iconos de marca y de alérgenos', () => {
    renderWithProviders(
      <button type="button">
        <Icon name={IconName.CLOSE} />
        <Icon name={IconName.SESAME} />
        <Icon name={IconName.WHATSAPP} />
        {t('common.close')}
      </button>,
    );

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: t('common.close') })).toBeInTheDocument();
  });
});
