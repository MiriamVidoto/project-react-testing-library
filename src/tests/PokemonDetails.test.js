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
    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const image = screen.getByRole('img', { name: /Pikachu sprite/i }).src;
    const imageLink = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

    expect(title).toBeDefined();
    expect(name).toHaveTextContent(/Pikachu/i);
    expect(type).toHaveTextContent(/electric/i);
    expect(weight).toHaveTextContent(/Average weight: 6.0 kg/i);
    expect(image).toBe(imageLink);
  });
});
