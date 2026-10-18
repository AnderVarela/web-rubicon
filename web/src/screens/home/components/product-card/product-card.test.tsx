import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, t } from '@test/render-with-providers';
import { CONTENT } from '@/content';
import { ProductCard } from './product-card';

const [panes, , empanadas] = CONTENT.catalogo;
const masaMadre = panes.productos[0];
const zamburinas = empanadas.productos.find((product) => product.precio === null)!;

describe('ProductCard', () => {
  it('describe el producto con su precio y abre la ficha al pulsarlo', async () => {
    const user = userEvent.setup();
    const onOpen = vi.fn();
    renderWithProviders(<ProductCard product={masaMadre} onOpen={onOpen} />);

    const card = screen.getByRole('button', { name: new RegExp(`^${masaMadre.nombre}, 4,20`) });
    expect(screen.getByText(masaMadre.descripcion)).toBeInTheDocument();

    await user.click(card);
    expect(onOpen).toHaveBeenCalledWith(masaMadre);
  });

  it('anuncia «consultar precio» y la etiqueta cuando el producto no tiene precio', () => {
    renderWithProviders(<ProductCard product={zamburinas} onOpen={vi.fn()} />);

    expect(
      screen.getByRole('button', {
        name: t('product.cardLabel', { name: zamburinas.nombre, price: t('product.cardPriceAsk'), tag: zamburinas.etiqueta! }),
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(zamburinas.etiqueta!)).toBeInTheDocument();
  });
});
