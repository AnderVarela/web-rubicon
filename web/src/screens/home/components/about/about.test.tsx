import { screen, within } from '@testing-library/react';
import { renderWithProviders, t } from '@test/render-with-providers';
import { CONTENT } from '@/content';
import { About } from './about';

describe('About', () => {
  it('presenta al equipo con el número de personas en el título', () => {
    renderWithProviders(<About />);

    const title = t('about.title', { count: String(CONTENT.equipo.length) }).replace(/<\/?em>/g, '');
    expect(screen.getByRole('heading', { level: 2, name: title })).toBeInTheDocument();
    expect(title).toContain('siete');

    const team = screen.getByRole('list', { name: t('about.team') });
    expect(within(team).getAllByRole('listitem')).toHaveLength(CONTENT.equipo.length);
  });

  it('no muestra la lista ni un número si web.json no trae equipo', () => {
    const original = CONTENT.equipo;
    CONTENT.equipo = [];
    renderWithProviders(<About />);

    expect(screen.getByRole('heading', { level: 2, name: t('about.titleNoTeam').replace(/<\/?em>/g, '') })).toBeInTheDocument();
    expect(screen.queryByRole('list', { name: t('about.team') })).not.toBeInTheDocument();
    CONTENT.equipo = original;
  });
});
