function createLoadoutService(repository) {
  if (
    !repository ||
    typeof repository.findAll !== 'function' ||
    typeof repository.findById !== 'function' ||
    typeof repository.create !== 'function'
  ) {
    throw new TypeError('El repositorio debe implementar findAll, findById y create');
  }

  return {
    list: () => repository.findAll(),
    getById: (id) => repository.findById(id),
    create(input) {
      const name = typeof input?.name === 'string' ? input.name.trim() : '';
      const weapon = typeof input?.weapon === 'string' ? input.weapon.trim() : '';
      const role = typeof input?.role === 'string' ? input.role.trim() : '';

      if (!name || !weapon || !role) {
        const error = new Error('name, weapon y role son obligatorios');
        error.status = 400;
        throw error;
      }

      return repository.create({ name, weapon, role });
    },
  };
}

module.exports = { createLoadoutService };
