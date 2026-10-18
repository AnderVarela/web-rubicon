import { renderWithProviders } from '@test/render-with-providers';
import { CONTENT } from '@/content';
import { HeroSeal } from './hero-seal';
import { getSealText } from './hero-seal.helper';

describe('HeroSeal', () => {
  it('rodea el símbolo con la línea de la portada sin que el lector de pantalla la repita', () => {
    const { container } = renderWithProviders(<HeroSeal line={CONTENT.portada.linea} />);

    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
    expect(container).toHaveTextContent(getSealText(CONTENT.portada.linea).trim());
  });

  it('enlaza el texto con su propio círculo aunque haya varios sellos en la página', () => {
    const { container } = renderWithProviders(
      <>
        <HeroSeal line={CONTENT.portada.linea} />
        <HeroSeal line={CONTENT.portada.linea} />
      </>,
    );

    const ids = Array.from(container.querySelectorAll('path')).map((path) => path.id);
    expect(new Set(ids).size).toBe(2);
  });
});
