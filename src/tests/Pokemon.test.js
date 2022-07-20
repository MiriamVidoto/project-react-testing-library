import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';

describe('Teste do componente <Pokemon.js />', () => {
  test('Se as informações detalhadas são mostradas na tela', () => {
    renderWithRouter(<App />);
    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const image = screen.getByRole('img', { name: /Pikachu sprite/i }).src;
    const imageLink = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

    expect(name).toHaveTextContent(/Pikachu/i);
    expect(type).toHaveTextContent(/electric/i);
    expect(weight).toHaveTextContent(/Average weight: 6.0 kg/i);
    expect(image).toBe(imageLink);
  });

  test('Se o card do pokémon contém um link para exibir mais detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const buttonDetails = screen.getByRole('link', { name: /More details/i });

    expect(buttonDetails).toBeDefined();

    userEvent.click(buttonDetails);

    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('Se existe um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<App />);
    const buttonDetails = screen.getByRole('link', { name: /More details/i });

    userEvent.click(buttonDetails);

    const favoriteCheck = screen.getByRole('checkbox', { name: /favoritado/i });

    userEvent.click(favoriteCheck);

    const favoriteIcon = screen.getByRole('img', { name: /is marked as favorite/i }).src;

    expect(favoriteIcon).toMatch('/star-icon.svg');
  });
});
