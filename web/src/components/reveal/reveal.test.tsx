import { act, screen } from '@testing-library/react';
import { renderWithProviders, t } from '@test/render-with-providers';
import { REVEAL_STATE_ATTRIBUTE, RevealState } from '@hooks/use-reveal';
import { Reveal } from './reveal';

type Callback = (entries: { isIntersecting: boolean }[]) => void;

// IntersectionObserver y la posición en pantalla son APIs del navegador: se simulan.
const mockBrowser = (top: number) => {
  let notify: Callback = () => undefined;
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      constructor(callback: Callback) {
        notify = callback;
      }
      observe() {}
      disconnect() {}
    },
  );
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({ top } as DOMRect);
  return (isIntersecting: boolean) => act(() => notify([{ isIntersecting }]));
};

describe('Reveal', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('esconde el bloque que está más abajo y lo muestra cuando el usuario llega a él', () => {
    const scrollTo = mockBrowser(5000);
    renderWithProviders(<Reveal delay={80}>{t('brand.name')}</Reveal>);
    const block = screen.getByText(t('brand.name'));

    expect(block).toHaveAttribute(REVEAL_STATE_ATTRIBUTE, RevealState.HIDDEN);
    scrollTo(false);
    expect(block).toHaveAttribute(REVEAL_STATE_ATTRIBUTE, RevealState.HIDDEN);
    scrollTo(true);
    expect(block).toHaveAttribute(REVEAL_STATE_ATTRIBUTE, RevealState.SHOWN);
  });

  it('no anima lo que ya se ve al cargar la página', () => {
    mockBrowser(100);
    renderWithProviders(<Reveal>{t('brand.name')}</Reveal>);

    expect(screen.getByText(t('brand.name'))).not.toHaveAttribute(REVEAL_STATE_ATTRIBUTE);
  });
});
