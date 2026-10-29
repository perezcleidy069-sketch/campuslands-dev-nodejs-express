function createTeamRepository() {
  const teams = [
    { id: 1, name: 'River Wardens', region: 'North League' },
    { id: 2, name: 'Solar Circuit', region: 'Open Cup' },
    { id: 3, name: 'Jade Sentinels', region: 'North League' },
  ];
  let nextId = teams.length + 1;

  return {
    findAll: () => teams.map((team) => ({ ...team })),
    findById: (id) => teams.find((team) => team.id === Number(id)) ?? null,
    create(input) {
      const team = { id: nextId++, ...input };
      teams.push(team);
      return { ...team };
    },
  };
}

module.exports = { createTeamRepository };
