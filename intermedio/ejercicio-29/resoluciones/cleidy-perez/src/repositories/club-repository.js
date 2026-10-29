function createClubRepository() {
  const clubs = [
    { id: 1, name: 'North City FC', league: 'Premier', city: 'Bogota' },
    { id: 2, name: 'Harbor United', league: 'National', city: 'Cartagena' },
    { id: 3, name: 'Mountain Athletic', league: 'Premier', city: 'Manizales' },
    { id: 4, name: 'River United', league: 'Futsal Premier', city: 'Cali' },
  ];
  let nextId = clubs.length + 1;

  return {
    findAll: () => clubs.map((club) => ({ ...club })),
    findById: (id) => clubs.find((club) => club.id === Number(id)) ?? null,
    create(input) {
      const club = { id: nextId++, ...input };
      clubs.push(club);
      return { ...club };
    },
  };
}

module.exports = { createClubRepository };
