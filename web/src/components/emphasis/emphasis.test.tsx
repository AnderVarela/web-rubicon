import { screen } from '@testing-library/react';
import { FormattedMessage } from 'react-intl';
import { renderWithProviders, t } from '@test/render-with-providers';
import { Emphasis, renderEmphasis } from './emphasis';

describe('Emphasis', () => {
  it('marca como énfasis una parte de un texto traducido', () => {
    renderWithProviders(
      <p>
        <FormattedMessage id="common.menu" />
        <Emphasis>{t('common.close')}</Emphasis>
      </p>,
    );

    expect(screen.getByText(t('common.close')).tagName).toBe('EM');
  });

  it('se puede usar como etiqueta <em> dentro de los mensajes enriquecidos', () => {
    const { container } = renderWithProviders(<p>{renderEmphasis([t('common.menu')])}</p>);

    expect(container.querySelector('em')).toHaveTextContent(t('common.menu'));
  });
});
