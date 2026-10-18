import { act } from '@testing-library/react';
import { renderWithProviders } from '@test/render-with-providers';
import { CONSENT_STORAGE_KEY, ConsentChoice, consentStore } from '@hooks/use-consent';
import { Home } from '@screens/home';

// jsdom no maqueta: se simula la posición de las secciones (API del navegador).
const placeSections = (tops: Record<string, number>) =>
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function rect(this: Element) {
    return { top: tops[this.id] ?? 9999 } as DOMRect;
  });

const scrollPage = async () => {
  await act(async () => {
    window.dispatchEvent(new Event('scroll'));
    await new Promise((resolve) => requestAnimationFrame(resolve));
  });
};

describe('useSectionHash', () => {
  beforeEach(() => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, ConsentChoice.TECHNICAL);
    consentStore.reset();
    window.history.replaceState(null, '', '/');
  });

  it('cambia el ancla de la URL según la sección que se ve, sin llenar el historial', async () => {
    const tops: Record<string, number> = { catalogo: 900, nosotros: 2000 };
    placeSections(tops);
    renderWithProviders(<Home />);
    await scrollPage();
    const historyLength = window.history.length;

    tops.catalogo = -500;
    tops.nosotros = 100;
    await scrollPage();
    expect(window.location.hash).toBe('#nosotros');

    tops.nosotros = 2000;
    tops.catalogo = 100;
    await scrollPage();
    expect(window.location.hash).toBe('#catalogo');
    expect(window.history.length).toBe(historyLength);
  });

  it('quita el ancla al volver arriba del todo, para recargar en la portada', async () => {
    const tops: Record<string, number> = { catalogo: 100 };
    placeSections(tops);
    renderWithProviders(<Home />);
    await scrollPage();
    expect(window.location.hash).toBe('#catalogo');

    tops.catalogo = 900;
    await scrollPage();

    expect(window.location.hash).toBe('');
    expect(window.location.pathname).toBe('/');
  });
});
