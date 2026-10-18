import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders, t } from '@test/render-with-providers';
import { Photo } from './photo';
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
});
