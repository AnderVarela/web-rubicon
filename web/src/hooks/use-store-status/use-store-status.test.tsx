import { screen } from '@testing-library/react';
import { renderWithProviders, t } from '@test/render-with-providers';
import { StoreStatus } from '@screens/components/store-status';

const at = (iso: string) => vi.useFakeTimers({ now: new Date(iso), toFake: ['Date'] });
const detail = (id: string, values: Record<string, string>) => screen.getByText(new RegExp(t(id, values)));

describe('useStoreStatus', () => {
  afterEach(() => vi.useRealTimers());

  it('calcula el próximo horario habitual: más tarde hoy, mañana o después del fin de semana', () => {
    at('2026-10-20T05:00:00Z'); // martes 7:00
    const { unmount } = renderWithProviders(<StoreStatus />);
    expect(detail('status.opensToday', { time: '8:00' })).toBeInTheDocument();
    unmount();

    at('2026-10-23T13:00:00Z'); // viernes 15:00
    const second = renderWithProviders(<StoreStatus />);
    expect(detail('status.opensTomorrow', { time: '8:00' })).toBeInTheDocument();
    second.unmount();

    at('2026-10-24T13:00:00Z'); // sábado 15:00: domingo y lunes cerrado
    renderWithProviders(<StoreStatus />);
    expect(detail('status.opensOn', { day: t('days.martes'), time: '8:00' })).toBeInTheDocument();
  });

  it('respeta los horarios especiales y los cierres de web.json', () => {
    at('2026-12-24T11:30:00Z'); // Nochebuena 12:30, abre hasta las 13:00
    const { unmount } = renderWithProviders(<StoreStatus />);
    expect(detail('status.until', { time: '13:00' })).toBeInTheDocument();
    unmount();

    at('2026-12-24T12:30:00Z'); // Nochebuena 13:30; Navidad cerrado; abre el sábado 26
    renderWithProviders(<StoreStatus />);
    expect(screen.getByText(t('status.closed'))).toBeInTheDocument();
    expect(detail('status.opensOn', { day: t('days.sabado'), time: '8:00' })).toBeInTheDocument();
  });
});
