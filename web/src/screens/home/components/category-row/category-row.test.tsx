import { fireEvent, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, t } from '@test/render-with-providers';
import { CONTENT } from '@/content';
import { CategoryRow } from './category-row';

const palmeritas = CONTENT.catalogo[1];

// jsdom no maqueta: se simulan las medidas de la fila desplazable (API del navegador).
const setRowSize = (row: HTMLElement, { scrollWidth, clientWidth, scrollLeft }: Record<string, number>) => {
  Object.defineProperty(row, 'scrollWidth', { configurable: true, value: scrollWidth });
  Object.defineProperty(row, 'clientWidth', { configurable: true, value: clientWidth });
  row.scrollLeft = scrollLeft;
  fireEvent.scroll(row);
};

describe('CategoryRow', () => {
  it('recorre la fila con las flechas y abre un producto con el teclado', async () => {
    const user = userEvent.setup();
    const onOpenProduct = vi.fn();
    const scrollBy = vi.spyOn(Element.prototype, 'scrollBy');
    renderWithProviders(<CategoryRow category={palmeritas} onOpenProduct={onOpenProduct} />);

    const region = screen.getByRole('region', { name: t('catalog.region', { category: palmeritas.nombre }) });
    setRowSize(region, { scrollWidth: 8000, clientWidth: 1200, scrollLeft: 0 });

    expect(screen.getByRole('button', { name: t('catalog.previous', { category: palmeritas.nombre }) })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: t('catalog.next', { category: palmeritas.nombre }) }));
    expect(scrollBy).toHaveBeenCalledWith(expect.objectContaining({ left: expect.any(Number) }));

    const cards = within(region).getAllByRole('button');
    cards[0].focus();
    await user.keyboard('{ArrowRight}');
    expect(cards[1]).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(onOpenProduct).toHaveBeenCalledWith(palmeritas.productos[1]);
  });

  it('desactiva «siguientes» al llegar al final y muestra cuántas piezas hay', () => {
    renderWithProviders(<CategoryRow category={palmeritas} onOpenProduct={vi.fn()} />);
    const region = screen.getByRole('region', { name: t('catalog.region', { category: palmeritas.nombre }) });

    setRowSize(region, { scrollWidth: 8000, clientWidth: 1200, scrollLeft: 6800 });

    expect(screen.getByRole('button', { name: t('catalog.next', { category: palmeritas.nombre }) })).toBeDisabled();
    expect(screen.getByRole('button', { name: t('catalog.previous', { category: palmeritas.nombre }) })).toBeEnabled();
    expect(screen.getByRole('heading', { level: 3, name: new RegExp(t('catalog.count', { count: 27 })) })).toBeInTheDocument();
  });
});
