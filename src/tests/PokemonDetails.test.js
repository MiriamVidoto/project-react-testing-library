import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';

describe('Teste do componente <Pokemon.js />', () => {
  test('Se as informações detalhadas são mostradas na tela', () => {
    renderWithRouter(<App />);
    const namePikachu = screen.getAllByText('Pikachu');
    const buttonDetails = screen.getByRole('link', { name: /More details/i });

    expect(namePikachu).toBeDefined();
    expect(buttonDetails).toBeDefined();

    userEvent.click(buttonDetails);

    const title = screen.getByRole('heading', { name: /Pikachu Details/i, level: 2 });
    const titleSummary = screen.getByRole('heading', { name: /Summary/i, level: 2 });
    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const image = screen.getByRole('img', { name: /Pikachu sprite/i }).src;
    const imageLink = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const text = screen.getByText(/This intelligent Pokémon roasts hard berries/i);
    const button = screen.queryByRole('link', { name: /More details/i });

    expect(title).toBeDefined();
    expect(titleSummary).toBeDefined();
    expect(name).toHaveTextContent(/Pikachu/i);
    expect(type).toHaveTextContent(/electric/i);
    expect(weight).toHaveTextContent(/Average weight: 6.0 kg/i);
    expect(image).toBe(imageLink);
    expect(text).toBeDefined();
    expect(button).toBeNull();
  });

  test('Se existe na página uma seção com os mapas', () => {
    renderWithRouter(<App />);
    const buttonDetails = screen.getByRole('link', { name: /More details/i });

    userEvent.click(buttonDetails);

    const title = screen.getByRole(
      'heading', { name: /Locations of Pikachu/i, level: 2 },
    );
    const location1 = screen.getByText(/Kanto Viridian Forest/i);
    const location2 = screen.getByText(/Kanto Power Plant/i);
    const images = screen.getAllByRole('img', { name: /Pikachu location/i });

    expect(location1).toBeDefined();
    expect(location2).toBeDefined();
    expect(title).toBeDefined();
    expect(images[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(images[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  test('Se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const buttonDetails = screen.getByRole('link', { name: /More details/i });

    userEvent.click(buttonDetails);

    const favoriteCheck = screen.getByRole('checkbox', { name: /favoritado/i });

    expect(favoriteCheck).toBeDefined();
  });
});
