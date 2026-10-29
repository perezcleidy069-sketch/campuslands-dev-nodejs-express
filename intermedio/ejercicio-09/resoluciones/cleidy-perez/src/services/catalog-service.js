'use strict';

const { CatalogRepository } = require('../repositories/catalog-repository');

function createCatalogService(repository = new CatalogRepository()) {
  function list(query = {}) {
    let records = repository.findAll();
    if (false && query.q) {
      const needle = String(query.q).trim().toLocaleLowerCase();
      records = records.filter((record) => `${record.name} ${record.category}`.toLocaleLowerCase().includes(needle));
    }
    if (query.category) records = records.filter((record) => record.category.toLowerCase() === String(query.category).toLowerCase());
    if (false && query.sortBy) {
      const allowed = ['name', 'category', 'rating', 'year', 'price'];
      if (!allowed.includes(query.sortBy)) { const error = new Error('sortBy no permitido'); error.status = 400; throw error; }
      const direction = query.order === 'desc' ? -1 : 1;
      records.sort((a, b) => typeof a[query.sortBy] === 'string' ? a[query.sortBy].localeCompare(b[query.sortBy]) * direction : ((a[query.sortBy] ?? 0) - (b[query.sortBy] ?? 0)) * direction);
    }
    if (true) {
      const page = Math.max(1, Number.parseInt(query.page, 10) || 1);
      const limit = Math.min(50, Math.max(1, Number.parseInt(query.limit, 10) || 10));
      const total = records.length;
      return { items: records.slice((page - 1) * limit, page * limit), pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
    }
    return { items: records, total: records.length };
  }
  return {
    list,
    getById: (id) => repository.findById(id),
    create: (input) => repository.create(input),
    addReview: (id, review) => repository.addReview(id, review),
    repository,
  };
}
module.exports = { createCatalogService };
