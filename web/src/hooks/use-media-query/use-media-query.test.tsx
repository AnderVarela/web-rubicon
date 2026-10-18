import { act, screen } from '@testing-library/react';
import { renderWithProviders, t } from '@test/render-with-providers';
import { useMediaQuery } from './use-media-query';
import { MEDIA_DESKTOP } from './use-media-query.const';

type Listener = () => void;

// matchMedia es una API del navegador: se simula como límite externo.
const mockViewport = (initial: boolean) => {
  let matches = initial;
  const listeners = new Set<Listener>();
  vi.spyOn(window, 'matchMedia').mockImplementation(
    (query) =>
      ({
        get matches() {
          return matches;
        },
        media: query,
        addEventListener: (_: string, listener: Listener) => listeners.add(listener),
        removeEventListener: (_: string, listener: Listener) => listeners.delete(listener),
      }) as unknown as MediaQueryList,
  );
  return (next: boolean) => {
    matches = next;
    listeners.forEach((listener) => listener());
  };
};

const Layout = () => <p>{useMediaQuery(MEDIA_DESKTOP) ? t('common.menu') : t('common.close')}</p>;

describe('useMediaQuery', () => {
  it('cambia la composición cuando la ventana pasa a tamaño escritorio', () => {
    const resize = mockViewport(false);
    renderWithProviders(<Layout />);
    expect(screen.getByText(t('common.close'))).toBeInTheDocument();

    act(() => resize(true));
    expect(screen.getByText(t('common.menu'))).toBeInTheDocument();
  });

  it('empieza en escritorio si la ventana ya es grande', () => {
    mockViewport(true);
    renderWithProviders(<Layout />);

    expect(screen.getByText(t('common.menu'))).toBeInTheDocument();
  });
});
