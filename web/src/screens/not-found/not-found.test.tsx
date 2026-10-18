import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, t } from '@test/render-with-providers';
import { CONTENT } from '@/content';
import { NotFound } from './not-found';

describe('NotFound', () => {
  it('explica que la página no existe y ofrece volver al inicio o ver el pan', async () => {
    const user = userEvent.setup();
    renderWithProviders(<NotFound />);

    expect(screen.getByRole('heading', { level: 1, name: t('notFound.title') })).toBeInTheDocument();
    expect(document.title).toBe(t('notFound.pageTitle'));
    expect(screen.getByRole('link', { name: t('notFound.back') })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: t('notFound.catalog') })).toHaveAttribute('href', '/#catalogo');

    await user.tab();
    expect(screen.getByRole('link', { name: t('notFound.home') })).toHaveFocus();
  });

  it('permite llamar a la tienda sin salir de la página', () => {
    renderWithProviders(<NotFound />);

    expect(screen.getByRole('link', { name: t('header.call', { phone: CONTENT.contacto.telefono.texto }) })).toHaveAttribute(
      'href',
      CONTENT.contacto.telefono.enlace,
    );
    expect(screen.getByText(t('notFound.section'))).toBeInTheDocument();
  });
});
