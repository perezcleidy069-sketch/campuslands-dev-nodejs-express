const validRisks = new Set(['low', 'medium', 'high']);

function createDropService(repository) {
  return {
    list: () => repository.findAll(),
    getById: (id) => repository.findById(id),
    create(input) {
      const name = typeof input?.name === 'string' ? input.name.trim() : '';
      const biome = typeof input?.biome === 'string' ? input.biome.trim() : '';
      const risk = typeof input?.risk === 'string' ? input.risk.trim().toLowerCase() : '';

      if (!name || !biome || !validRisks.has(risk)) {
        const error = new Error('name, biome y risk (low, medium o high) son obligatorios');
        error.status = 400;
        throw error;
      }

      return repository.create({ name, biome, risk });
    },
  };
}

module.exports = { createDropService };
