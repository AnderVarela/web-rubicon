import { screen } from '@testing-library/react';
import { renderWithProviders, t } from '@test/render-with-providers';
import { ProductPrice } from './product-price';
import { ProductPriceLayout } from './product-price.const';

describe('ProductPrice', () => {
  it('muestra el precio en euros con su unidad', () => {
    renderWithProviders(<ProductPrice product={{ precio: 5.75, unidad: '¼ kg' }} />);

    expect(screen.getByText(/5,75\s€/)).toBeInTheDocument();
    expect(screen.getByText(t('price.perUnit', { unit: '¼ kg' }))).toBeInTheDocument();
  });

  it('invita a consultar en tienda cuando el producto no tiene precio', () => {
    renderWithProviders(<ProductPrice product={{ precio: null, unidad: 'unidad' }} layout={ProductPriceLayout.INLINE} />);

    expect(screen.getByText(t('price.ask'))).toBeInTheDocument();
    expect(screen.getByText(t('price.askNote'))).toBeInTheDocument();
  });
});
