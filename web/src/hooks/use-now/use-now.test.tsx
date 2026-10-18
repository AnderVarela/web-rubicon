import { act, screen } from '@testing-library/react';
import { renderWithProviders, t } from '@test/render-with-providers';
import { StoreStatus } from '@screens/components/store-status';
import { NOW_REFRESH_MS } from './use-now.const';

describe('useNow', () => {
  afterEach(() => vi.useRealTimers());

  it('pasa de «Cerrado» a «Abierto ahora» sin recargar cuando llega la hora de abrir', () => {
    vi.useFakeTimers({ now: new Date('2026-10-20T05:59:30Z') }); // martes 7:59:30 en Madrid
    renderWithProviders(<StoreStatus />);
    expect(screen.getByText(t('status.closed'))).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(NOW_REFRESH_MS));

    expect(screen.getByText(t('status.open'))).toBeInTheDocument();
  });

  it('deja de actualizarse al salir de la página', () => {
    vi.useFakeTimers({ now: new Date('2026-10-20T05:59:30Z') });
    const { unmount } = renderWithProviders(<StoreStatus />);

    unmount();

    expect(vi.getTimerCount()).toBe(0);
  });
});
