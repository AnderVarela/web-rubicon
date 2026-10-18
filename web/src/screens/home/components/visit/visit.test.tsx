import { screen, within } from '@testing-library/react';
import { renderWithProviders, t } from '@test/render-with-providers';
import { CONTENT } from '@/content';
import { Visit } from './visit';

describe('Visit', () => {
  it('ofrece llamar, escribir por WhatsApp o ir a la tienda, con su horario y dirección', () => {
    renderWithProviders(<Visit />);

    const section = screen.getByRole('region', { name: t('visit.title') });
    expect(within(section).getByRole('link', { name: new RegExp(`^${t('visit.call')}`) })).toHaveAttribute('href', CONTENT.contacto.telefono.enlace);
    expect(within(section).getByRole('link', { name: new RegExp(`^${t('visit.whatsapp')}`) })).toHaveAttribute('target', '_blank');
    expect(within(section).getByText(t('visit.whatsappWarning'))).toBeInTheDocument();
    expect(within(section).getByRole('table', { name: t('hours.caption') })).toBeInTheDocument();
    expect(within(section).getByRole('list', { name: t('social.label') })).toBeInTheDocument();
  });

  it('no enseña el apartado de email cuando la tienda no lo ha configurado', () => {
    const original = CONTENT.contacto;
    CONTENT.contacto = { ...original, email: '' };
    renderWithProviders(<Visit />);

    expect(screen.queryByText(t('visit.email'))).not.toBeInTheDocument();
    CONTENT.contacto = original;
  });
});
