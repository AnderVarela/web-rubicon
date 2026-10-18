import { screen, within } from '@testing-library/react';
import { renderWithProviders, t } from '@test/render-with-providers';
import { LegalDocumentId } from '@screens/components/legal-nav';
import { LegalDocNav } from './legal-doc-nav';

describe('LegalDocNav', () => {
  it('marca el documento que se está leyendo y enlaza a los demás', () => {
    renderWithProviders(<LegalDocNav current={LegalDocumentId.PRIVACY} />);

    const nav = screen.getByRole('navigation', { name: t('legal.navLabel') });
    expect(within(nav).getByRole('link', { name: t('legal.privacy') })).toHaveAttribute('aria-current', 'page');
    expect(within(nav).getByRole('link', { name: t('legal.cookies') })).toHaveAttribute('href', '/cookies/');
  });

  it('solo marca un documento cada vez', () => {
    renderWithProviders(<LegalDocNav current={LegalDocumentId.COOKIES} />);

    expect(screen.getAllByRole('link', { current: 'page' })).toHaveLength(1);
  });
});
