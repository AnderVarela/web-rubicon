import { screen } from '@testing-library/react';
import { renderWithProviders, t } from '@test/render-with-providers';
import { Text } from './text';
import { TypographyKinds, TypographyVariant } from './text.const';

describe('Text', () => {
  it('muestra un encabezado que el lector de pantalla anuncia con su nivel', () => {
    renderWithProviders(
      <Text kind={TypographyKinds.H2} variant={TypographyVariant.DISPLAY}>
        {t('common.menu')}
      </Text>,
    );

    expect(screen.getByRole('heading', { level: 2, name: t('common.menu') })).toBeInTheDocument();
  });

  it('asocia una etiqueta a su campo para que se pueda pulsar y leer', () => {
    renderWithProviders(
      <>
        <Text kind={TypographyKinds.LABEL} htmlFor="campo">
          {t('common.close')}
        </Text>
        <input id="campo" />
      </>,
    );

    expect(screen.getByLabelText(t('common.close'))).toBeInTheDocument();
  });
});
