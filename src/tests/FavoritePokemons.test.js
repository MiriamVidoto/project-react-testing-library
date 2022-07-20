import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';

describe('Teste do componente <FavoritePokemons.js />', () => {
  test('Se é exibida na tela uma mensagem, caso não tenha pokémons favoritos', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');

    const text = screen.getByText(/No favorite pokemon found/i);
    expect(text).toBeDefined();
  });

  test('Se são exibidos todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const checked = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    userEvent.click(checked);

    history.push('/favorites');

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeDefined();
  });
});
