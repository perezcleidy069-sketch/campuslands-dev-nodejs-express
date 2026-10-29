function createGameRepository() {
  const games = [
    { id: 1, name: 'Ashen Crown', genre: 'Fantasy RPG' },
    { id: 2, name: 'Clockwork Vale', genre: 'Steampunk RPG' },
    { id: 3, name: 'Starbound Oath', genre: 'Sci-fi RPG' },
  ];
  let nextId = games.length + 1;

  return {
    findAll: () => games.map((game) => ({ ...game })),
    findById: (id) => games.find((game) => game.id === Number(id)) ?? null,
    create(input) {
      const game = { id: nextId++, ...input };
      games.push(game);
      return { ...game };
    },
  };
}

module.exports = { createGameRepository };
