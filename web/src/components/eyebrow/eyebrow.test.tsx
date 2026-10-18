import { screen } from '@testing-library/react';
import { renderWithProviders, t } from '@test/render-with-providers';
import { TypographyKinds } from '@components/text';
import { Eyebrow } from './eyebrow';

describe('Eyebrow', () => {
  it('presenta un antetítulo legible sin anunciar la línea decorativa', () => {
    renderWithProviders(<Eyebrow>{t('brand.nameWithSlogan')}</Eyebrow>);

    expect(screen.getByText(t('brand.nameWithSlogan'))).toHaveTextContent(t('brand.nameWithSlogan'));
  });

  it('puede ser un antetítulo en línea dentro de otro bloque', () => {
    renderWithProviders(<Eyebrow kind={TypographyKinds.SPAN}>{t('brand.name')}</Eyebrow>);

    expect(screen.getByText(t('brand.name')).tagName).toBe('SPAN');
  });
});
