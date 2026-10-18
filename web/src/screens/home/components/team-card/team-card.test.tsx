import { screen } from '@testing-library/react';
import { renderWithProviders, t } from '@test/render-with-providers';
import { CONTENT } from '@/content';
import { TeamCard } from './team-card';

const [andres] = CONTENT.equipo;

describe('TeamCard', () => {
  it('presenta a la persona con su puesto y lo que hace', () => {
    renderWithProviders(
      <ul>
        <TeamCard person={andres} />
      </ul>,
    );

    expect(screen.getByRole('heading', { level: 3, name: andres.nombre })).toBeInTheDocument();
    expect(screen.getByText(andres.puesto)).toBeInTheDocument();
    expect(screen.getByText(andres.descripcion)).toBeInTheDocument();
  });

  it('muestra su inicial y lo anuncia cuando todavía no hay foto', () => {
    renderWithProviders(
      <ul>
        <TeamCard person={{ ...andres, foto: null }} />
      </ul>,
    );

    expect(screen.getByRole('img', { name: t('about.noPhoto', { name: andres.nombre }) })).toHaveTextContent('A');
  });
});
