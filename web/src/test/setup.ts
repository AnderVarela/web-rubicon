import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { consentStore } from '@hooks/use-consent';

afterEach(() => {
  cleanup();
  document.body.removeAttribute('data-scroll-lock');
  window.localStorage.clear();
  consentStore.reset();
});

// jsdom no implementa estas APIs del navegador: son límites externos y se simulan.
if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      addListener: () => undefined,
      removeListener: () => undefined,
      dispatchEvent: () => false,
    }) as MediaQueryList;
}

if (!window.scrollTo || String(window.scrollTo).includes('notImplemented')) {
  window.scrollTo = () => undefined;
}

if (!Element.prototype.scrollBy) {
  Element.prototype.scrollBy = function scrollBy() {
    return undefined;
  };
}

if (!('IntersectionObserver' in window)) {
  class IntersectionObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  Object.defineProperty(window, 'IntersectionObserver', { value: IntersectionObserverStub, writable: true, configurable: true });
}
