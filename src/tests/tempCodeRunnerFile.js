test('Se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);
    const numberPokemon = 1;
    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');

    expect(name).toBeDefined();
    expect(type).toBeDefined();
    expect(weight).toBeDefined();
  });