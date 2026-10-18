import { screen } from '@testing-library/react';
import { renderWithProviders, t } from '@test/render-with-providers';
import { SectionHeading } from './section-heading';

describe('SectionHeading', () => {
  it('muestra el nombre de la sección y su número de orden', () => {
    renderWithProviders(<SectionHeading label={t('brand.name')} number={t('common.sectionNumber', { number: '01' })} />);

    expect(screen.getByText(t('brand.name'))).toBeInTheDocument();
    expect(screen.getByText(t('common.sectionNumber', { number: '01' }))).toBeInTheDocument();
  });

  it('no se confunde con un encabezado de la página', () => {
    renderWithProviders(<SectionHeading label={t('brand.name')} number={t('common.sectionNumber', { number: '02' })} />);

    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });
});
