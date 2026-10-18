import { screen } from '@testing-library/react';
import { renderWithProviders, t } from '@test/render-with-providers';
import { Tag } from './tag';
import { TagTone } from './tag.const';

describe('Tag', () => {
  it('destaca un producto con su etiqueta', () => {
    renderWithProviders(<Tag label={t('brand.name')} tone={TagTone.NEW} />);

    expect(screen.getByText(t('brand.name'))).toBeInTheDocument();
  });

  it('forma parte del nombre de la tarjeta que lo contiene aunque no tenga tono propio', () => {
    renderWithProviders(
      <button type="button">
        {t('common.menu')} <Tag label={t('brand.name')} />
      </button>,
    );

    expect(screen.getByRole('button', { name: `${t('common.menu')} ${t('brand.name')}` })).toBeInTheDocument();
  });
});
