import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, t } from '@test/render-with-providers';
import { NotFound } from './not-found';

describe('NotFound', () => {
  it('explica que la página no existe y lleva de vuelta al inicio', async () => {
    const user = userEvent.setup();
    renderWithProviders(<NotFound />);

    expect(screen.getByRole('heading', { level: 1, name: t('notFound.title') })).toBeInTheDocument();
    expect(document.title).toBe(t('notFound.pageTitle'));
    const back = screen.getByRole('link', { name: t('notFound.back') });
    expect(back).toHaveAttribute('href', '/');

    await user.tab();
    expect(screen.getByRole('link', { name: t('notFound.home') })).toHaveFocus();
  });

  it('describe la ilustración para quien no la ve', () => {
    renderWithProviders(<NotFound />);

    expect(screen.getByRole('img', { name: t('notFound.illustration') })).toBeInTheDocument();
  });
});
