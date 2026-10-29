function createClubService(repository) {
  return {
    list({ q, page, limit } = {}) {
      let clubs = repository.findAll();
      if (typeof q === 'string' && q.trim()) {
        const search = q.trim().toLocaleLowerCase();
        clubs = clubs.filter((club) =>
          `${club.name} ${club.league} ${club.city}`
            .toLocaleLowerCase()
            .includes(search),
        );
      }

      const currentPage = Math.max(1, Number.parseInt(page, 10) || 1);
      const pageSize = Math.min(50, Math.max(1, Number.parseInt(limit, 10) || 10));
      const total = clubs.length;
      const start = (currentPage - 1) * pageSize;

      return {
        data: clubs.slice(start, start + pageSize),
        pagination: {
          page: currentPage,
          limit: pageSize,
          total,
          pages: Math.ceil(total / pageSize),
        },
      };
    },
    getById: (id) => repository.findById(id),
    create(input) {
      const name = typeof input?.name === 'string' ? input.name.trim() : '';
      const league = typeof input?.league === 'string' ? input.league.trim() : '';
      const city = typeof input?.city === 'string' ? input.city.trim() : '';

      if (!name || !league || !city) {
        const error = new Error('name, league y city son obligatorios');
        error.status = 400;
        throw error;
      }

      return repository.create({ name, league, city });
    },
  };
}

module.exports = { createClubService };
