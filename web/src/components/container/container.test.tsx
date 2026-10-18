import { screen } from '@testing-library/react';
import { renderWithProviders, t } from '@test/render-with-providers';
import { Container } from './container';

describe('Container', () => {
  it('envuelve el contenido de una sección sin alterarlo', () => {
    renderWithProviders(
      <Container>
        <h2>{t('brand.name')}</h2>
      </Container>,
    );

    expect(screen.getByRole('heading', { name: t('brand.name') })).toBeInTheDocument();
  });

  it('no crea un punto de referencia propio, para no duplicar las regiones de la página', () => {
    renderWithProviders(
      <section aria-label={t('brand.name')}>
        <Container>
          <p>{t('common.menu')}</p>
        </Container>
      </section>,
    );

    expect(screen.getAllByRole('region')).toHaveLength(1);
  });
});
