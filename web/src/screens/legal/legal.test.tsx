import { screen, within } from '@testing-library/react';
import { renderWithProviders, t } from '@test/render-with-providers';
import { LegalDocumentId } from '@screens/components/legal-nav';
import { Legal } from './legal';

describe('Legal', () => {
  it('muestra la política de cookies completa, con su tabla y el título en la pestaña', () => {
    renderWithProviders(<Legal documentId={LegalDocumentId.COOKIES} />);

    expect(screen.getByRole('heading', { level: 1, name: t('legal.cookies.title') })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(5);
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(document.title).toBe(t('legal.pageTitle', { title: t('legal.cookies.title') }));
    expect(screen.getByText(t('legal.updated', { date: '1 de octubre de 2026' }))).toBeInTheDocument();
  });

  it('desde una página legal se puede volver a cualquier sección de la portada', () => {
    renderWithProviders(<Legal documentId={LegalDocumentId.ACCESSIBILITY} />);

    const footer = screen.getByRole('contentinfo');
    expect(within(footer).getByRole('link', { name: t('nav.catalog') })).toHaveAttribute('href', '/#catalogo');
    expect(screen.getByRole('link', { name: t('legal.back') })).toHaveAttribute('href', '/');
  });
});
