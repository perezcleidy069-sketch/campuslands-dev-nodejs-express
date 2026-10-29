function createGameService(repository) {
  return {
    list: () => repository.findAll(),
    getById: (id) => repository.findById(id),
    create(input) {
      const name = typeof input?.name === 'string' ? input.name.trim() : '';
      const genre = typeof input?.genre === 'string' ? input.genre.trim() : '';

      if (!name || !genre) {
        const error = new Error('name y genre son obligatorios');
        error.status = 400;
        throw error;
      }

      return repository.create({ name, genre });
    },
  };
}

module.exports = { createGameService };
