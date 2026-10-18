import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders, t } from '@test/render-with-providers';
import { Photo } from './photo';
import { toPhotoSources } from './photo.helper';
import { PhotoRatio } from './photo.const';

describe('Photo', () => {
  it('muestra la foto con su texto alternativo cuando llega', () => {
    renderWithProviders(<Photo src="/pan.jpg" alt={t('brand.name')} ratio={PhotoRatio.LANDSCAPE} />);

    const image = screen.getByRole('img', { name: t('brand.name') });
    fireEvent.load(image);

    expect(image).toHaveAttribute('src', '/pan.jpg');
    expect(image).toHaveAttribute('loading', 'lazy');
  });

  it('enseña un marcador con el símbolo de la marca si todavía no hay foto', () => {
    renderWithProviders(<Photo src={null} alt={t('brand.name')} />);

    expect(screen.getByRole('img', { name: t('brand.name') }).tagName).toBe('SPAN');
  });

  it('carga primero la foto principal y ofrece formatos modernos al navegador', () => {
    const { container } = renderWithProviders(
      <Photo
        src="/portada.jpeg"
        sources={toPhotoSources({ jpeg: '/portada-800.jpeg 800w', avif: '/portada-800.avif 800w', webp: '/portada-800.webp 800w' })}
        sizes="100vw"
        priority
        alt={t('brand.name')}
      />,
    );

    const image = screen.getByRole('img', { name: t('brand.name') });
    expect(image).toHaveAttribute('fetchpriority', 'high');
    expect(image).toHaveAttribute('loading', 'eager');
    expect(Array.from(container.querySelectorAll('source')).map((source) => source.getAttribute('type'))).toEqual([
      'image/avif',
      'image/webp',
      'image/jpeg',
    ]);
  });
});

