function createTeamService(repository) {
  return {
    list: () => repository.findAll(),
    getById: (id) => repository.findById(id),
    create(input) {
      const name = typeof input?.name === 'string' ? input.name.trim() : '';
      const region = typeof input?.region === 'string' ? input.region.trim() : '';
      if (!name || !region) {
        const error = new Error('name y region son obligatorios');
        error.status = 400;
        throw error;
      }
      return repository.create({ name, region });
    },
  };
}

module.exports = { createTeamService };
