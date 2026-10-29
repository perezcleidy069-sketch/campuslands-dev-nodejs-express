const formulas = [
  { id: 1, name: 'Agua', formula: 'H2O', use: 'Disolvente' },
  { id: 2, name: 'Dioxido de carbono', formula: 'CO2', use: 'Carbonatacion' },
  { id: 3, name: 'Amoniaco', formula: 'NH3', use: 'Fertilizantes' },
];

function createFormulaRepository() {
  let nextId = formulas.length + 1;
  const records = formulas.map((formula) => ({ ...formula }));

  return {
    findAll: () => records.map((formula) => ({ ...formula })),
    findById: (id) => records.find((formula) => formula.id === Number(id)) ?? null,
    create(formula) {
      const record = { id: nextId++, ...formula };
      records.push(record);
      return { ...record };
    },
  };
}

module.exports = { createFormulaRepository };
