import { screen } from '@testing-library/react';
import { renderWithProviders, t } from '@test/render-with-providers';
import { VisuallyHidden } from './visually-hidden';

describe('VisuallyHidden', () => {
  it('da nombre accesible a un botón que solo muestra un icono', () => {
    renderWithProviders(
      <button type="button">
        <span aria-hidden="true">×</span>
        <VisuallyHidden>{t('common.close')}</VisuallyHidden>
      </button>,
    );

    expect(screen.getByRole('button', { name: t('common.close') })).toBeInTheDocument();
  });

  it('sirve de descripción referenciada por id', () => {
    renderWithProviders(
      <>
        <button type="button" aria-describedby="ayuda">
          {t('common.menu')}
        </button>
        <VisuallyHidden id="ayuda">{t('common.opensNewTab')}</VisuallyHidden>
      </>,
    );

    expect(screen.getByRole('button', { name: t('common.menu') })).toHaveAccessibleDescription(t('common.opensNewTab'));
  });
});
