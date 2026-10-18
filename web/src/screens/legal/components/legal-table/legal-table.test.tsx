import { screen, within } from '@testing-library/react';
import { renderWithProviders, t } from '@test/render-with-providers';
import { CONTENT } from '@/content';
import { LegalDocumentId } from '@screens/components/legal-nav';
import { LEGAL_DOCUMENT_CONTENT } from '@screens/legal/legal.const';
import { getContactValues } from '@screens/legal/legal.helper';
import { LegalTable } from './legal-table';

const values = getContactValues(CONTENT.contacto);

describe('LegalTable', () => {
  it('lista las cookies con su titular, finalidad y duración', () => {
    renderWithProviders(<LegalTable table={LEGAL_DOCUMENT_CONTENT[LegalDocumentId.COOKIES].sections[1].table!} values={values} />);

    const table = screen.getByRole('table');
    expect(within(table).getByRole('columnheader', { name: t('legal.cookies.table.purpose') })).toBeInTheDocument();
    expect(within(table).getByRole('row', { name: /rubicon_ck/ })).toHaveTextContent(t('legal.cookies.table.technical'));
  });

  it('rellena los datos del titular con el contacto de web.json', () => {
    renderWithProviders(<LegalTable table={LEGAL_DOCUMENT_CONTENT[LegalDocumentId.NOTICE].sections[0].table!} values={values} />);

    expect(screen.getByRole('row', { name: new RegExp(t('legal.notice.table.phone')) })).toHaveTextContent(CONTENT.contacto.telefono.texto);
  });
});
