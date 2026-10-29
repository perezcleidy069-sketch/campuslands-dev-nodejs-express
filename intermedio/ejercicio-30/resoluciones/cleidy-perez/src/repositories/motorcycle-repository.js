function createMotorcycleRepository() {
  const motorcycles = [
    { id: 1, name: 'Trail 450', maker: 'Northstar', category: 'Adventure', year: 2025, displacement: 450, price: 8900 },
    { id: 2, name: 'Comet 700', maker: 'Velocita', category: 'Sport', year: 2024, displacement: 700, price: 12500 },
    { id: 3, name: 'Metro 250', maker: 'Urban Works', category: 'Urban', year: 2023, displacement: 250, price: 4100 },
  ];
  let nextId = motorcycles.length + 1;

  return {
    findAll: () => motorcycles.map((motorcycle) => ({ ...motorcycle })),
    findById: (id) =>
      motorcycles.find((motorcycle) => motorcycle.id === Number(id)) ?? null,
    create(input) {
      const motorcycle = { id: nextId++, ...input };
      motorcycles.push(motorcycle);
      return { ...motorcycle };
    },
  };
}

module.exports = { createMotorcycleRepository };
