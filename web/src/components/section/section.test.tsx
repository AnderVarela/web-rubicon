import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, t } from '@test/render-with-providers';
import { Section } from './section';
import { SectionTone } from './section.const';

describe('Section', () => {
  it('es una región con nombre a la que se puede saltar desde el menú', () => {
    renderWithProviders(
      <Section id="nosotros" labelledBy="nosotros-titulo" tone={SectionTone.SUBTLE}>
        <h2 id="nosotros-titulo">{t('brand.name')}</h2>
      </Section>,
    );

    const region = screen.getByRole('region', { name: t('brand.name') });
    expect(region).toHaveAttribute('id', 'nosotros');
  });

  it('recibe al usuario que llega desde un enlace del menú', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <>
        <a href="#visitanos">{t('common.menu')}</a>
        <Section id="visitanos" labelledBy="visitanos-titulo">
          <h2 id="visitanos-titulo">{t('brand.name')}</h2>
        </Section>
      </>,
    );

    await user.click(screen.getByRole('link', { name: t('common.menu') }));

    expect(window.location.hash).toBe('#visitanos');
  });
});
