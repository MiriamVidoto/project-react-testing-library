import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';

describe('Teste do componente <App.js />', () => {
  test('Se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /Home/i });
    const linkAbout = screen.getByRole('link', { name: /About/i });
    const linkFavorite = screen.getByRole('link', { name: /Favorite/i });

    expect(linkHome).toBeDefined();
    expect(linkAbout).toBeDefined();
    expect(linkFavorite).toBeDefined();
  });

  test('Se a aplicação é redirecionada para a página de About', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /About/i });
    userEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');
  });

  test('Se a aplicação é redirecionada para a página de Pokémons Favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorite = screen.getByRole('link', { name: /Favorite/i });
    userEvent.click(linkFavorite);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Se a aplicação é redirecionada para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/lalalala');

    expect(screen.getByText(/Page requested not found/i)).toBeDefined();
  });
});
