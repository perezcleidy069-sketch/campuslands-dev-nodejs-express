'use strict';

const initialRecords = [
  {
    "name": "Ari Santos",
    "category": "Singles",
    "rating": 91,
    "year": 2025
  },
  {
    "name": "Bo Kim",
    "category": "Doubles",
    "rating": 86,
    "year": 2024
  },
  {
    "name": "Cam Lee",
    "category": "Singles",
    "rating": 94,
    "year": 2025
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
