import { screen, within } from '@testing-library/react';
import { renderWithProviders, t } from '@test/render-with-providers';
import { SectionId } from '@screens/components/section-nav';
import { SiteHeader } from './site-header';

describe('SiteHeader', () => {
  it('ofrece volver al inicio, saltar a cada sección y llamar a la tienda', () => {
    renderWithProviders(<SiteHeader activeId={SectionId.REVIEWS} scrolled />);

    const header = screen.getByRole('banner');
    expect(within(header).getByRole('link', { name: t('nav.homeLink') })).toHaveAttribute('href', '#inicio');
    expect(within(header).getByRole('link', { name: t('nav.reviews') })).toHaveAttribute('aria-current', 'location');
    expect(within(header).getByRole('link', { name: t('header.call', { phone: '+34 634 18 77 47' }) })).toHaveAttribute(
      'href',
      'tel:+34634187747',
    );
  });

  it('no marca ninguna sección mientras el usuario está en la portada', () => {
    renderWithProviders(<SiteHeader activeId={SectionId.HOME} scrolled={false} />);

    expect(screen.queryByRole('link', { current: 'location' })).not.toBeInTheDocument();
  });
});
