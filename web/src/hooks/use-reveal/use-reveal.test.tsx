import { screen } from '@testing-library/react';
import { renderWithProviders, t } from '@test/render-with-providers';
import { Reveal } from '@components/reveal';
import { MEDIA_REDUCED_MOTION } from '@hooks/use-media-query';
import { REVEAL_STATE_ATTRIBUTE } from './use-reveal.const';

describe('useReveal', () => {
  it('no esconde nada si el usuario prefiere menos movimiento', () => {
    vi.spyOn(window, 'matchMedia').mockImplementation(
      (query) =>
        ({ matches: query === MEDIA_REDUCED_MOTION, media: query, addEventListener: () => undefined, removeEventListener: () => undefined }) as unknown as MediaQueryList,
    );
    vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({ top: 5000 } as DOMRect);
    renderWithProviders(<Reveal>{t('brand.name')}</Reveal>);

    expect(screen.getByText(t('brand.name'))).not.toHaveAttribute(REVEAL_STATE_ATTRIBUTE);
  });

  it('deja todo visible en navegadores sin IntersectionObserver', () => {
    const original = window.IntersectionObserver;
    Reflect.deleteProperty(window, 'IntersectionObserver');
    vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({ top: 5000 } as DOMRect);
    renderWithProviders(<Reveal>{t('brand.name')}</Reveal>);

    expect(screen.getByText(t('brand.name'))).not.toHaveAttribute(REVEAL_STATE_ATTRIBUTE);
    Object.defineProperty(window, 'IntersectionObserver', { value: original, writable: true, configurable: true });
  });
});
