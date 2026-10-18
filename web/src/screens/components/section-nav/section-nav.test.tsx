import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, t } from '@test/render-with-providers';
import { SectionNav } from './section-nav';
import { SectionId, SectionNavVariant } from './section-nav.const';

describe('SectionNav', () => {
  it('lleva a cada sección de la portada y marca dónde está el usuario', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    renderWithProviders(<SectionNav variant={SectionNavVariant.MENU} activeId={SectionId.ABOUT} onNavigate={onNavigate} />);

    const nav = screen.getByRole('navigation', { name: t('nav.label') });
    const about = within(nav).getByRole('link', { name: new RegExp(t('nav.about')) });
    expect(about).toHaveAttribute('aria-current', 'location');
    expect(about).toHaveTextContent(t('nav.here'));

    await user.click(within(nav).getByRole('link', { name: new RegExp(t('nav.visit')) }));
    expect(onNavigate).toHaveBeenCalledWith(SectionId.VISIT, expect.anything());
  });

  it('desde una página legal vuelve a la portada antes de saltar a la sección', () => {
    renderWithProviders(<SectionNav variant={SectionNavVariant.FOOTER} fromHome={false} />);

    expect(screen.getByRole('link', { name: t('nav.catalog') })).toHaveAttribute('href', '/#catalogo');
    expect(screen.queryByRole('link', { current: 'location' })).not.toBeInTheDocument();
  });
});
