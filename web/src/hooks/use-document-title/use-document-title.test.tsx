import { renderWithProviders, t } from '@test/render-with-providers';
import { LegalDocumentId } from '@screens/components/legal-nav';
import { Legal } from '@screens/legal';
import { NotFound } from '@screens/not-found';

describe('useDocumentTitle', () => {
  it('pone en la pestaña el nombre del documento legal que se está leyendo', () => {
    renderWithProviders(<Legal documentId={LegalDocumentId.NOTICE} />);

    expect(document.title).toBe(t('legal.pageTitle', { title: t('legal.notice.title') }));
  });

  it('avisa en la pestaña de que la página no existe', () => {
    renderWithProviders(<NotFound />);

    expect(document.title).toBe(t('notFound.pageTitle'));
  });
});
