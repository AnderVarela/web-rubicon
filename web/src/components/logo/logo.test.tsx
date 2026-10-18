import { screen } from '@testing-library/react';
import { renderWithProviders, t } from '@test/render-with-providers';
import { Logo } from './logo';
import { LogoVariant } from './logo.const';

describe('Logo', () => {
  it('se lee como la marca cuando es el titular de la portada', () => {
    renderWithProviders(
      <h1>
        <Logo variant={LogoVariant.WORDMARK_SLOGAN} label={t('brand.nameWithSlogan')} />
      </h1>,
    );

    expect(screen.getByRole('heading', { level: 1, name: t('brand.nameWithSlogan') })).toBeInTheDocument();
  });

  it('no repite la marca al lector de pantalla cuando el botón que lo contiene ya tiene nombre', () => {
    renderWithProviders(
      <button type="button" aria-label={t('brand.name')}>
        <Logo variant={LogoVariant.SYMBOL} />
      </button>,
    );

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: t('brand.name') })).toBeInTheDocument();
  });
});
