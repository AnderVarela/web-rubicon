import { screen } from '@testing-library/react';
import { renderWithProviders, t } from '@test/render-with-providers';
import { StatusDot } from './status-dot';

describe('StatusDot', () => {
  it('acompaña al texto del estado sin añadir ruido para el lector de pantalla', () => {
    renderWithProviders(
      <p>
        <StatusDot open />
        {t('common.menu')}
      </p>,
    );

    expect(screen.getByText(t('common.menu'))).toHaveTextContent(new RegExp(`^${t('common.menu')}$`));
  });

  it('se muestra también cuando la tienda está cerrada y sin animación', () => {
    const { container } = renderWithProviders(<StatusDot open={false} />);

    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });
});
