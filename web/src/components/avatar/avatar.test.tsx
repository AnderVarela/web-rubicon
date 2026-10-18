import { screen } from '@testing-library/react';
import { renderWithProviders, t } from '@test/render-with-providers';
import { Avatar } from './avatar';
import { AvatarTone } from './avatar.const';

describe('Avatar', () => {
  it('muestra la inicial del autor sin repetir su nombre al lector de pantalla', () => {
    renderWithProviders(
      <footer>
        <Avatar name={t('brand.name')} tone={AvatarTone.ROSE} />
        <span>{t('brand.name')}</span>
      </footer>,
    );

    expect(screen.getByText(t('brand.name').charAt(0))).toHaveAttribute('aria-hidden', 'true');
  });

  it('aguanta nombres con espacios delante o en minúscula', () => {
    renderWithProviders(<Avatar name="  íñigo" />);

    expect(screen.getByText('Í')).toBeInTheDocument();
  });
});
