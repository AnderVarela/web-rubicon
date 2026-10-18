import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, t } from '@test/render-with-providers';
import { CONTENT } from '@/content';
import { Catalog } from './catalog';

describe('Catalog', () => {
  it('el visitante salta a una categoría, abre una pieza y vuelve a la tarjeta al cerrar', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Catalog />);

    expect(screen.getByRole('region', { name: t('catalog.title').replace(/<\/?em>/g, '') })).toHaveAttribute('id', 'catalogo');
    const categories = screen.getByRole('navigation', { name: t('catalog.categories') });
    await user.click(within(categories).getByRole('link', { name: /Empanadas/ }));
    expect(window.location.hash).toBe('#catalogo-empanadas');

    const empanadas = screen.getByRole('region', { name: t('catalog.region', { category: 'Empanadas' }) });
    const card = within(empanadas).getAllByRole('button')[0];
    await user.click(card);

    const product = CONTENT.catalogo[2].productos[0];
    const sheet = screen.getByRole('dialog', { name: product.nombre });
    expect(within(sheet).getByText('Empanadas')).toBeInTheDocument();

    await user.click(within(sheet).getByRole('button', { name: t('product.close') }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(card).toHaveFocus();
  });

  it('avisa de que el catálogo llegará pronto si web.json no trae categorías', () => {
    const original = CONTENT.catalogo;
    CONTENT.catalogo = [];
    renderWithProviders(<Catalog />);

    expect(screen.getByText(t('catalog.empty'))).toBeInTheDocument();
    expect(screen.queryByRole('navigation', { name: t('catalog.categories') })).not.toBeInTheDocument();
    CONTENT.catalogo = original;
  });
});
