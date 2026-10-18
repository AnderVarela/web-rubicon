import { screen, within } from '@testing-library/react';
import { renderWithProviders, t } from '@test/render-with-providers';
import { OpeningHours } from './opening-hours';
import { OpeningHoursVariant } from './opening-hours.const';

const at = (iso: string) => vi.useFakeTimers({ now: new Date(iso), toFake: ['Date'] });
const row = (day: RegExp) => within(screen.getByRole('table', { name: t('hours.caption') })).getByRole('row', { name: day });

describe('OpeningHours', () => {
  afterEach(() => vi.useRealTimers());

  it('en una semana normal muestra el horario habitual y marca hoy', () => {
    at('2026-10-20T10:00:00Z'); // martes
    renderWithProviders(<OpeningHours />);

    const today = row(/Martes/);
    expect(today).toHaveAttribute('aria-current', 'date');
    expect(today).toHaveTextContent(t('hours.today'));
    expect(today).toHaveTextContent(t('hours.range', { from: '8:00', to: '14:30' }));
    expect(row(/Lunes/)).toHaveTextContent(t('hours.closed'));
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('aplica los días excepcionales de la semana en la propia tabla, sin listarlos aparte', () => {
    at('2026-12-21T10:00:00Z'); // lunes de la semana de Navidad
    renderWithProviders(<OpeningHours />);

    expect(row(/Jueves/)).toHaveTextContent(t('hours.range', { from: '8:00', to: '13:00' })); // Nochebuena
    expect(row(/Viernes/)).toHaveTextContent(t('hours.closed')); // Navidad
    expect(row(/Sábado/)).toHaveTextContent(t('hours.range', { from: '8:00', to: '14:30' }));
    expect(screen.queryByText(/Nochebuena|Navidad/)).not.toBeInTheDocument();
  });

  it('resume el horario en el pie agrupando los días iguales', () => {
    renderWithProviders(<OpeningHours variant={OpeningHoursVariant.SUMMARY} />);

    expect(screen.getByText('Martes a sábado, 8:00 – 14:30')).toBeInTheDocument();
    expect(screen.getByText('Domingo y lunes, cerrado')).toBeInTheDocument();
  });
});
