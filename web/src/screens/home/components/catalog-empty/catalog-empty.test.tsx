import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, t } from '@test/render-with-providers';
import { CONTENT } from '@/content';
import { CatalogEmpty } from './catalog-empty';
import { CATALOG_EMPTY_MESSAGES } from './catalog-empty.const';

describe('CatalogEmpty', () => {
  it('el visitante ve que el catálogo llega pronto y puede preguntar por WhatsApp o por teléfono', () => {
    renderWithProviders(<CatalogEmpty />);
    const { telefono, whatsapp } = CONTENT.contacto;

    expect(screen.getByRole('heading', { name: t(CATALOG_EMPTY_MESSAGES.title) })).toBeInTheDocument();
    const chat = screen.getByRole('link', { name: t(CATALOG_EMPTY_MESSAGES.whatsapp) });
    expect(chat).toHaveAttribute('href', whatsapp.enlace);
    expect(chat).toHaveAttribute('target', '_blank');
    expect(screen.getByRole('link', { name: t(CATALOG_EMPTY_MESSAGES.call, { phone: telefono.texto }) })).toHaveAttribute('href', telefono.enlace);
  });

  it('con teclado solo se recorren los dos contactos: la estantería decorativa no recibe el foco', async () => {
    const user = userEvent.setup();
    renderWithProviders(<CatalogEmpty />);

    await user.tab();
    expect(screen.getByRole('link', { name: t(CATALOG_EMPTY_MESSAGES.whatsapp) })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('link', { name: t(CATALOG_EMPTY_MESSAGES.call, { phone: CONTENT.contacto.telefono.texto }) })).toHaveFocus();
    await user.tab();
    expect(document.body).toHaveFocus();
    expect(screen.getByText(t(CATALOG_EMPTY_MESSAGES.slot, { number: 2 })).closest('[aria-hidden="true"]')).not.toBeNull();
  });
});
