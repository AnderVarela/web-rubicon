import { screen } from '@testing-library/react';
import { renderWithProviders, t } from '@test/render-with-providers';
import { CONTENT } from '@/content';
import { LegalDocumentId } from '@screens/components/legal-nav';
import { LEGAL_DOCUMENT_CONTENT } from '@screens/legal/legal.const';
import { getContactValues } from '@screens/legal/legal.helper';
import { LegalSection } from './legal-section';

const values = getContactValues(CONTENT.contacto);
const privacy = LEGAL_DOCUMENT_CONTENT[LegalDocumentId.PRIVACY];

describe('LegalSection', () => {
  it('presenta un apartado con su título y el email real de la tienda', () => {
    renderWithProviders(<LegalSection section={privacy.sections[0]} values={values} />);

    expect(screen.getByRole('region', { name: t('legal.privacy.s1.title') })).toBeInTheDocument();
    expect(screen.getByText(new RegExp(CONTENT.contacto.email))).toBeInTheDocument();
  });

  it('incluye la tabla solo en los apartados que la tienen', () => {
    renderWithProviders(<LegalSection section={privacy.sections[2]} values={values} />);

    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });
});
