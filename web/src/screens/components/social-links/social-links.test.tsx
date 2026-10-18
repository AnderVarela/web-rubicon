import { screen, within } from '@testing-library/react';
import { renderWithProviders, t } from '@test/render-with-providers';
import { SocialLinks } from './social-links';
import { SocialLinksVariant } from './social-links.const';

describe('SocialLinks', () => {
  it('enlaza a cada red de la panadería en una pestaña nueva', () => {
    renderWithProviders(<SocialLinks />);

    const list = screen.getByRole('list', { name: t('social.label') });
    const instagram = within(list).getByRole('link', { name: t('social.instagram') });
    expect(instagram).toHaveAttribute('href', 'https://instagram.com/panaderiarubicon');
    expect(instagram).toHaveAttribute('target', '_blank');
    expect(within(list).getAllByRole('link')).toHaveLength(3);
  });

  it('no pinta los iconos de las redes que no están configuradas', () => {
    const { container } = renderWithProviders(<SocialLinks variant={SocialLinksVariant.GHOST_INVERSE} redes={{}} />);
    expect(container).toBeEmptyDOMElement();

    renderWithProviders(<SocialLinks redes={{ tiktok: 'https://tiktok.com/@x' }} />);
    expect(screen.getByRole('link', { name: t('social.tiktok') })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: t('social.instagram') })).not.toBeInTheDocument();
  });
});
