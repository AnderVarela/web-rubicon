import { screen } from '@testing-library/react';
import { renderWithProviders, t } from '@test/render-with-providers';
import { StoreStatus } from './store-status';
import { StoreStatusVariant } from './store-status.const';

// La hora es un límite externo: se fija para que el estado sea predecible.
const at = (iso: string) => vi.useFakeTimers({ now: new Date(iso), toFake: ['Date'] });

describe('StoreStatus', () => {
  afterEach(() => vi.useRealTimers());

  it('dice que está abierto y hasta qué hora un martes por la mañana en Madrid', () => {
    at('2026-10-20T08:30:00Z'); // martes, 10:30 en Madrid
    renderWithProviders(<StoreStatus variant={StoreStatusVariant.PILL} />);

    expect(screen.getByText(t('status.open'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(t('status.until', { time: '14:30' })))).toBeInTheDocument();
  });

  it('dice cuándo vuelve a abrir si está cerrado, saltándose los festivos de web.json', () => {
    at('2026-12-07T16:00:00Z'); // lunes cerrado; el martes 8 es festivo, abre el miércoles
    renderWithProviders(<StoreStatus />);

    expect(screen.getByText(t('status.closed'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(t('status.opensOn', { day: t('days.miercoles'), time: '8:00' })))).toBeInTheDocument();
  });
});
