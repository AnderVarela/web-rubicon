import { screen } from '@testing-library/react';
import { renderWithProviders, t } from '@test/render-with-providers';
import { IconName } from '@components/icon';
import { ActionRow } from './action-row';

describe('ActionRow', () => {
  it('ofrece llamar a la tienda con un enlace claro', () => {
    renderWithProviders(
      <ActionRow href="tel:+34634187747" icon={IconName.PHONE} title={t('common.menu')} subtitle={t('brand.name')} />,
    );

    const link = screen.getByRole('link', { name: `${t('common.menu')} ${t('brand.name')}` });
    expect(link).toHaveAttribute('href', 'tel:+34634187747');
    expect(link).not.toHaveAttribute('target');
  });

  it('abre en otra pestaña las acciones que salen de la web', () => {
    renderWithProviders(
      <ActionRow
        href="https://wa.me/34634187747"
        icon={IconName.WHATSAPP}
        title={t('common.close')}
        subtitle={t('brand.name')}
        external
        hoverSubtle
      />,
    );

    expect(screen.getByRole('link')).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
