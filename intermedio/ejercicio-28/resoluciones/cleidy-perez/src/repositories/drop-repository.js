function createDropRepository() {
  const drops = [
    { id: 1, name: 'Dust Harbor', biome: 'Coastal', risk: 'medium' },
    { id: 2, name: 'Pine Relay', biome: 'Forest', risk: 'low' },
    { id: 3, name: 'Sunken Array', biome: 'Industrial', risk: 'high' },
  ];
  let nextId = drops.length + 1;

  return {
    findAll: () => drops.map((drop) => ({ ...drop })),
    findById: (id) => drops.find((drop) => drop.id === Number(id)) ?? null,
    create(input) {
      const drop = { id: nextId++, ...input };
      drops.push(drop);
      return { ...drop };
    },
  };
}

module.exports = { createDropRepository };
