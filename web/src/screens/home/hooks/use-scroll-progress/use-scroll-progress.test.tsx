import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders, t } from '@test/render-with-providers';
import { CONTENT } from '@/content';
import { CategoryRow } from '@screens/home/components/category-row';

const panes = CONTENT.catalogo[0];

const sizeRow = (row: HTMLElement, scrollWidth: number, clientWidth: number, scrollLeft: number) => {
  Object.defineProperty(row, 'scrollWidth', { configurable: true, value: scrollWidth });
  Object.defineProperty(row, 'clientWidth', { configurable: true, value: clientWidth });
  row.scrollLeft = scrollLeft;
  fireEvent.scroll(row);
};

describe('useScrollProgress', () => {
  it('activa las dos flechas cuando el usuario está a mitad de la fila', () => {
    renderWithProviders(<CategoryRow category={panes} onOpenProduct={vi.fn()} />);

    sizeRow(screen.getByRole('region', { name: t('catalog.region', { category: panes.nombre }) }), 2000, 1000, 500);

    expect(screen.getByRole('button', { name: t('catalog.previous', { category: panes.nombre }) })).toBeEnabled();
    expect(screen.getByRole('button', { name: t('catalog.next', { category: panes.nombre }) })).toBeEnabled();
  });

  it('desactiva las flechas si todas las piezas caben en pantalla', () => {
    renderWithProviders(<CategoryRow category={panes} onOpenProduct={vi.fn()} />);

    sizeRow(screen.getByRole('region', { name: t('catalog.region', { category: panes.nombre }) }), 1000, 1000, 0);

    expect(screen.getByRole('button', { name: t('catalog.previous', { category: panes.nombre }) })).toBeDisabled();
    expect(screen.getByRole('button', { name: t('catalog.next', { category: panes.nombre }) })).toBeDisabled();
  });
});
