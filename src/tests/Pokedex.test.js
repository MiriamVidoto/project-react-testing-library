import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';

describe('Teste do componente <Pokedex.js />', () => {
  test('Se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole(
      'heading', { name: /Encountered pokémons/i, level: 2 },
    );
    expect(title).toBeDefined();
  });

  test('Se é exibido o próximo pokémon da lista quando o botão Próximo é clicado', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(button).toBeDefined();

    userEvent.click(button);

    const namePokemon = screen.getByText(/Charmander/i);
    const buttonDetails = screen.getByRole('link', { name: /More details/i });

    expect(namePokemon).toBeDefined();
    expect(buttonDetails).toBeDefined();
  });

  test('Se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);
    const numberPokemon = 1;
    const name = screen.getAllByTestId('pokemon-name');
    const type = screen.getAllByTestId('pokemon-type');
    const weight = screen.getAllByTestId('pokemon-weight');

    expect(name).toHaveLength(numberPokemon);
    expect(type).toHaveLength(numberPokemon);
    expect(weight).toHaveLength(numberPokemon);
  });

  test('Se a Pokédex tem os botões de filtro e um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const numberButtons = 7;
    const filterButtons = screen.getAllByTestId('pokemon-type-button');

    expect(filterButtons).toHaveLength(numberButtons);

    expect(screen.getByRole('button', { name: /electric/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /fire/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /bug/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /poison/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /psychic/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /normal/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /dragon/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /all/i })).toBeDefined();
  });

  test('Se ao clicar em um botão de tipo, é mostrado os pokémons daquele tipo', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /fire/i });
    expect(button).toBeDefined();

    userEvent.click(button);

    const nameCharmander = screen.getAllByText('Charmander');
    const buttonAll = screen.getByRole('button', { name: /all/i });

    expect(nameCharmander).toBeDefined();
    expect(buttonAll).toBeDefined();

    userEvent.click(buttonAll);

    const namePikachu = screen.getAllByText('Pikachu');
    expect(namePikachu).toBeDefined();
  });
});
