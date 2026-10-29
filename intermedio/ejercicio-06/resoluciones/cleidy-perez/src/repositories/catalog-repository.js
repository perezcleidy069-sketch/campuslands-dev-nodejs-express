'use strict';

const initialRecords = [
  {
    "name": "Trail 450",
    "category": "Adventure",
    "rating": 86,
    "year": 2025,
    "price": 8900
  },
  {
    "name": "Comet 700",
    "category": "Sport",
    "rating": 92,
    "year": 2024,
    "price": 12500
  },
  {
    "name": "Metro 250",
    "category": "Urban",
    "rating": 78,
    "year": 2023,
    "price": 4100
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
