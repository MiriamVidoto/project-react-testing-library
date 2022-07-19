import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';

describe('Teste do componente <About.js />', () => {
  test('Se a página contém um heading h2 com o texto About Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    const title = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(title).toBeDefined();
  });

  test('Se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    const text1 = screen.getByText(
      /This application simulates a Pokédex, a digital encyclopedia containing all/i,
    );
    const text2 = screen.getByText(
      /One can filter Pokémons by type, and see more details for each one of them/i,
    );

    expect(text1).toBeDefined();
    expect(text2).toBeDefined();
  });
  test('Se a página contém a imagem de uma Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    const img = screen.getByRole('img', { name: /pokédex/i }).src;
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(img).toBe(url);
  });
});
