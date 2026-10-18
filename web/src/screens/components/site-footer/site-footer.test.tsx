import { screen, within } from '@testing-library/react';
import { renderWithProviders, t } from '@test/render-with-providers';
import { CONTENT } from '@/content';
import { SiteFooter } from './site-footer';

describe('SiteFooter', () => {
  it('reúne contacto, horario, secciones, redes y enlaces legales', () => {
    renderWithProviders(<SiteFooter />);

    const footer = screen.getByRole('contentinfo');
    expect(within(footer).getByRole('link', { name: CONTENT.contacto.telefono.texto })).toHaveAttribute('href', CONTENT.contacto.telefono.enlace);
    expect(within(footer).getByRole('link', { name: CONTENT.contacto.email })).toHaveAttribute('href', `mailto:${CONTENT.contacto.email}`);
    expect(within(footer).getByText('Martes a sábado, 8:00 – 14:30')).toBeInTheDocument();
    expect(within(footer).getByRole('navigation', { name: t('footer.sections') })).toBeInTheDocument();
    expect(within(footer).getByText(t('footer.copyright', { year: new Date().getFullYear() }))).toBeInTheDocument();
  });

  it('desde una página legal enlaza a las secciones de la portada y oculta el email si no hay', () => {
    const original = CONTENT.contacto;
    CONTENT.contacto = { ...original, email: '' };
    renderWithProviders(<SiteFooter fromHome={false} />);

    expect(screen.getByRole('link', { name: t('nav.visit') })).toHaveAttribute('href', '/#visitanos');
    expect(screen.queryByRole('link', { name: /@/ })).not.toBeInTheDocument();
    CONTENT.contacto = original;
  });
});
