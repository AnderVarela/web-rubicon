import { screen, within } from '@testing-library/react';
import { renderWithProviders, t } from '@test/render-with-providers';
import { OpeningHours } from './opening-hours';
import { OpeningHoursVariant } from './opening-hours.const';

describe('OpeningHours', () => {
  afterEach(() => vi.useRealTimers());

  it('muestra el horario de la semana, marca hoy y avisa de los días especiales', () => {
    vi.useFakeTimers({ now: new Date('2026-10-20T10:00:00Z'), toFake: ['Date'] }); // martes
    renderWithProviders(<OpeningHours />);

    const table = screen.getByRole('table', { name: t('hours.caption') });
    const today = within(table).getByRole('row', { current: 'date' });
    expect(today).toHaveTextContent('Martes');
    expect(today).toHaveTextContent(t('hours.today'));
    expect(today).toHaveTextContent(t('hours.range', { from: '8:00', to: '14:30' }));
    expect(within(table).getByRole('row', { name: /Lunes/ })).toHaveTextContent(t('hours.closed'));

    expect(screen.getByRole('list', { name: t('hours.exceptions') })).toHaveTextContent('Nochebuena');
  });

  it('resume el horario en el pie agrupando los días iguales', () => {
    renderWithProviders(<OpeningHours variant={OpeningHoursVariant.SUMMARY} />);

    expect(screen.getByText('Martes a sábado, 8:00 – 14:30')).toBeInTheDocument();
    expect(screen.getByText('Domingo y lunes, cerrado')).toBeInTheDocument();
  });
});
