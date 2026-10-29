function createFormulaService(repository) {
  if (!repository) {
    throw new TypeError('Se requiere un repositorio de formulas');
  }

  return {
    list() {
      return repository.findAll();
    },
    getById(id) {
      return repository.findById(id);
    },
    create(input) {
      const name = typeof input?.name === 'string' ? input.name.trim() : '';
      const formula = typeof input?.formula === 'string' ? input.formula.trim() : '';
      const use = typeof input?.use === 'string' ? input.use.trim() : '';

      if (!name || !/^[A-Z][A-Za-z0-9()]*$/.test(formula) || !use) {
        const error = new Error('name, formula quimica y use son obligatorios');
        error.status = 400;
        throw error;
      }

      return repository.create({ name, formula, use });
    },
  };
}

module.exports = { createFormulaService };
