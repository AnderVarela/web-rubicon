import { act, screen, within } from '@testing-library/react';
import { renderWithProviders, t } from '@test/render-with-providers';
import { Home } from '@screens/home';

// Sin motor de maquetación en jsdom: se simula la posición de las secciones (API del navegador).
const placeSections = (tops: Record<string, number>) =>
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function rect(this: Element) {
    return { top: tops[this.id] ?? 9999 } as DOMRect;
  });

// Las secciones que aún no pinta la portada se añaden como anclas vacías.
const addSectionAnchors = (ids: string[]) => {
  const anchors = ids.map((id) => {
    const anchor = document.createElement('section');
    anchor.id = id;
    document.body.append(anchor);
    return anchor;
  });
  return () => anchors.forEach((anchor) => anchor.remove());
};

const scrollPage = async () => {
  await act(async () => {
    window.dispatchEvent(new Event('scroll'));
    await new Promise((resolve) => requestAnimationFrame(resolve));
  });
};

describe('useActiveSection', () => {
  it('cambia la sección marcada en la barra inferior a medida que el usuario baja', async () => {
    const tops: Record<string, number> = { catalogo: 900, nosotros: 2000 };
    placeSections(tops);
    const cleanup = addSectionAnchors(['catalogo', 'nosotros']);
    renderWithProviders(<Home />);
    const dock = screen.getByRole('navigation', { name: t('dock.label') });
    expect(within(dock).getByText(t('nav.home'))).toBeInTheDocument();

    tops.catalogo = 100;
    await scrollPage();

    expect(within(dock).getByText(t('nav.catalog'))).toBeInTheDocument();
    cleanup();
  });

  it('vuelve a «Inicio» cuando el usuario sube hasta arriba', async () => {
    const tops: Record<string, number> = { catalogo: 100 };
    placeSections(tops);
    const cleanup = addSectionAnchors(['catalogo']);
    renderWithProviders(<Home />);
    await scrollPage();

    tops.catalogo = 900;
    await scrollPage();

    expect(within(screen.getByRole('navigation', { name: t('dock.label') })).getByText(t('nav.home'))).toBeInTheDocument();
    cleanup();
  });
});
