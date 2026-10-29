function createLoadoutRepository() {
  const loadouts = [
    { id: 1, name: 'Longshot Kit', weapon: 'Operator', role: 'Marksman' },
    { id: 2, name: 'Breach Setup', weapon: 'Vandal', role: 'Entry' },
    { id: 3, name: 'Anchor Pack', weapon: 'Phantom', role: 'Defender' },
  ];
  let nextId = loadouts.length + 1;

  return {
    findAll: () => loadouts.map((loadout) => ({ ...loadout })),
    findById: (id) => loadouts.find((loadout) => loadout.id === Number(id)) ?? null,
    create(input) {
      const loadout = { id: nextId++, ...input };
      loadouts.push(loadout);
      return { ...loadout };
    },
  };
}

module.exports = { createLoadoutRepository };
