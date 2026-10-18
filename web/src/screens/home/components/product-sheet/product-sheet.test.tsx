import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, t } from '@test/render-with-providers';
import { CONTENT } from '@/content';
import { ProductSheet } from './product-sheet';

const panes = CONTENT.catalogo[0];
const espelta = panes.productos.find((product) => product.alergenos.includes('Sésamo'))!;

describe('ProductSheet', () => {
  it('enseña ingredientes, alérgenos y permite preguntar por WhatsApp por ese producto', () => {
    renderWithProviders(<ProductSheet product={espelta} categoryName={panes.nombre} onClose={vi.fn()} />);

    const sheet = screen.getByRole('dialog', { name: espelta.nombre });
    expect(within(sheet).getByRole('button', { name: t('product.close') })).toHaveFocus();
    expect(within(sheet).getByText('sésamo', { selector: 'strong' })).toBeInTheDocument();
    expect(within(sheet).getByRole('list', { name: t('product.allergens') })).toHaveTextContent('Sésamo');
    expect(within(sheet).getByText(t('product.traces'))).toBeInTheDocument();

    const whatsapp = within(sheet).getByRole('link', { name: new RegExp(t('product.whatsappTitle')) });
    expect(whatsapp.getAttribute('href')).toContain(encodeURIComponent(t('product.whatsappMessage', { product: espelta.nombre })));
  });

  it('se cierra con Escape o con el botón de cerrar', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    renderWithProviders(<ProductSheet product={espelta} categoryName={panes.nombre} onClose={onClose} />);

    await user.keyboard('{Escape}');
    await user.click(screen.getByRole('button', { name: t('product.close') }));

    expect(onClose).toHaveBeenCalledTimes(2);
  });
});
