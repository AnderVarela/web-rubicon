import { useState } from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, t } from '@test/render-with-providers';
import { Switch } from './switch';

const Harness = ({ initial }: { initial: boolean }) => {
  const [checked, setChecked] = useState(initial);
  return (
    <>
      <p id="mapas">{t('brand.name')}</p>
      <Switch checked={checked} onChange={setChecked} labelledBy="mapas" />
    </>
  );
};

describe('Switch', () => {
  it('activa una opción con el ratón y la vuelve a desactivar con el teclado', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Harness initial={false} />);

    const control = screen.getByRole('switch', { name: t('brand.name') });
    await user.click(control);
    expect(control).toBeChecked();

    await user.keyboard(' ');
    expect(control).not.toBeChecked();
  });

  it('muestra activada una opción que ya estaba permitida', () => {
    renderWithProviders(<Harness initial />);

    expect(screen.getByRole('switch', { name: t('brand.name') })).toBeChecked();
  });
});
