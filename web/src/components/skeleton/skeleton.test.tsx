import { screen } from '@testing-library/react';
import { renderWithProviders, t } from '@test/render-with-providers';
import { Skeleton } from './skeleton';
import { SkeletonTone } from './skeleton.const';

describe('Skeleton', () => {
  it('ocupa el sitio del contenido mientras carga sin que el lector de pantalla lo lea', () => {
    renderWithProviders(
      <div aria-busy="true" aria-label={t('common.loading')} role="group">
        <Skeleton width="58%" height="22px" />
        <Skeleton tone={SkeletonTone.WARM} fill />
      </div>,
    );

    const group = screen.getByRole('group', { name: t('common.loading') });
    expect(group).toHaveAttribute('aria-busy', 'true');
    expect(group).toHaveTextContent('');
  });

  it('usa medidas por defecto cuando no se indican', () => {
    const { container } = renderWithProviders(<Skeleton tone={SkeletonTone.SAND} />);

    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });
});
