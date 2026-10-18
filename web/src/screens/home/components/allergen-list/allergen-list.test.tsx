import { screen } from '@testing-library/react';
import { renderWithProviders, t } from '@test/render-with-providers';
import { AllergenList } from './allergen-list';

describe('AllergenList', () => {
  it('enumera los alérgenos del producto con su nombre', () => {
    renderWithProviders(
      <>
        <h3 id="alergenos">{t('product.allergens')}</h3>
        <AllergenList allergens={['Gluten', 'Leche', 'Frutos de cáscara']} labelledBy="alergenos" />
      </>,
    );

    const list = screen.getByRole('list', { name: t('product.allergens') });
    expect(list.querySelectorAll('li')).toHaveLength(3);
    expect(screen.getByText('Frutos de cáscara')).toBeInTheDocument();
  });

  it('dice que no hay alérgenos declarados cuando la lista está vacía', () => {
    renderWithProviders(<AllergenList allergens={[]} labelledBy="alergenos" />);

    expect(screen.getByText(t('product.noAllergens'))).toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});
