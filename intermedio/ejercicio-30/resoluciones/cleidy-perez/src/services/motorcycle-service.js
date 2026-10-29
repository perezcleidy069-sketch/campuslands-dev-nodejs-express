const sortableFields = new Set(['name', 'maker', 'category', 'year', 'price']);

function createMotorcycleService(repository) {
  return {
    list(query = {}) {
      let motorcycles = repository.findAll();
      const search = typeof query.q === 'string' ? query.q.trim().toLowerCase() : '';
      const category =
        typeof query.category === 'string' ? query.category.trim().toLowerCase() : '';

      if (search) {
        motorcycles = motorcycles.filter((motorcycle) =>
          `${motorcycle.name} ${motorcycle.maker} ${motorcycle.category}`
            .toLowerCase()
            .includes(search),
        );
      }
      if (category) {
        motorcycles = motorcycles.filter(
          (motorcycle) => motorcycle.category.toLowerCase() === category,
        );
      }

      if (query.sortBy) {
        if (!sortableFields.has(query.sortBy)) {
          const error = new Error('sortBy no permitido');
          error.status = 400;
          throw error;
        }
        const direction = query.order === 'desc' ? -1 : 1;
        motorcycles.sort((left, right) => {
          const a = left[query.sortBy];
          const b = right[query.sortBy];
          return typeof a === 'string'
            ? a.localeCompare(b) * direction
            : (a - b) * direction;
        });
      }

      const page = Math.max(1, Number.parseInt(query.page, 10) || 1);
      const limit = Math.min(50, Math.max(1, Number.parseInt(query.limit, 10) || 10));
      const total = motorcycles.length;

      return {
        data: motorcycles.slice((page - 1) * limit, page * limit),
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      };
    },
    getById: (id) => repository.findById(id),
    create(input) {
      return repository.create(input);
    },
  };
}

module.exports = { createMotorcycleService };
