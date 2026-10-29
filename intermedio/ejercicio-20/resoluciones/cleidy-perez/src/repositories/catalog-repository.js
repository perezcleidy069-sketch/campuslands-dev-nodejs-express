'use strict';

const initialRecords = [
  {
    "name": "Soft Grain",
    "category": "Pencil",
    "rating": 92,
    "year": 2025
  },
  {
    "name": "Wide Wash",
    "category": "Watercolor",
    "rating": 87,
    "year": 2024
  },
  {
    "name": "Edge Light",
    "category": "Airbrush",
    "rating": 90,
    "year": 2023
  }
];

class CatalogRepository {
  constructor(records = initialRecords) {
    this.records = records.map((record, index) => ({ id: index + 1, reviews: [], ...record }));
    this.nextId = this.records.reduce((max, record) => Math.max(max, record.id), 0) + 1;
  }
  findAll() { return this.records.map((record) => ({ ...record, reviews: [...record.reviews] })); }
  findById(id) { const record = this.records.find((item) => item.id === Number(id)); return record ? { ...record, reviews: [...record.reviews] } : null; }
  create(input) { const record = { id: this.nextId++, reviews: [], ...input }; this.records.push(record); return { ...record }; }
  addReview(id, review) { const record = this.records.find((item) => item.id === Number(id)); if (!record) return null; record.reviews.push(review); return { ...review }; }
}
module.exports = { CatalogRepository };
