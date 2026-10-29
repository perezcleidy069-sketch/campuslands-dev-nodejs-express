'use strict';
function validateRecord(req, res, next) {
  const { name, category, rating, year } = req.body || {};
  const errors = [];
  if (typeof name !== 'string' || name.trim().length < 2) errors.push({ field: 'name', message: 'Debe contener al menos 2 caracteres' });
  if (typeof category !== 'string' || !category.trim()) errors.push({ field: 'category', message: 'Es obligatorio' });
  if (rating !== undefined && (!Number.isFinite(Number(rating)) || Number(rating) < 0 || Number(rating) > 100)) errors.push({ field: 'rating', message: 'Debe ser un numero entre 0 y 100' });
  if (year !== undefined && (!Number.isInteger(Number(year)) || Number(year) < 1800 || Number(year) > 2200)) errors.push({ field: 'year', message: 'Debe ser un ano valido' });
  if (errors.length) return res.status(400).json({ ok: false, error: 'Validacion fallida', details: errors });
  req.validatedRecord = { name: name.trim(), category: category.trim(), ...(rating !== undefined ? { rating: Number(rating) } : {}), ...(year !== undefined ? { year: Number(year) } : {}) };
  next();
}
module.exports = { validateRecord };
