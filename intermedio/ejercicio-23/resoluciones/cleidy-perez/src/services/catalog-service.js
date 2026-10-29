'use strict';

const { CatalogRepository } = require('../repositories/catalog-repository');

function createCatalogService(repository = new CatalogRepository()) {
  function list(query = {}) {
    let records = repository.findAll();
    if (query.category) {
      const category = String(query.category).toLocaleLowerCase();
      records = records.filter(
        (record) => record.category.toLocaleLowerCase() === category,
      );
    }

    return { items: records, total: records.length };
  }

  return {
    list,
    getById: (id) => repository.findById(id),
    create: (input) => repository.create(input),
    addReview: (id, review) => repository.addReview(id, review),
  };
}

module.exports = { createCatalogService };
