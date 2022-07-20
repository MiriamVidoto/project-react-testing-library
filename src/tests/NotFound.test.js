import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';

describe('Teste do componente <NotFound.js />', () => {
  test('Se a página contém um heading h2 com o texto Page requested not found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/lalalala');

    const title = screen.getByRole('heading', { name: /Page requested not found/i });

    expect(title).toBeDefined();
  });

  test('Se a página mostra uma imagem', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/lalalala');

    const image = screen.getByRole('img', { name: /Pikachu crying/i }).src;
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(image).toBe(url);
  });
});
