function validateMotorcycle(req, res, next) {
  const { name, maker, category, year, displacement, price } = req.body ?? {};
  const errors = [];

  if (typeof name !== 'string' || !name.trim()) errors.push('name es obligatorio');
  if (typeof maker !== 'string' || !maker.trim()) errors.push('maker es obligatorio');
  if (typeof category !== 'string' || !category.trim()) errors.push('category es obligatorio');
  if (!Number.isInteger(year) || year < 1885 || year > new Date().getFullYear() + 1) {
    errors.push('year debe ser un anio valido');
  }
  if (!Number.isInteger(displacement) || displacement < 1) {
    errors.push('displacement debe ser un entero positivo');
  }
  if (typeof price !== 'number' || !Number.isFinite(price) || price <= 0) {
    errors.push('price debe ser un numero positivo');
  }

  if (errors.length) {
    res.status(400).json({
      ok: false,
      message: 'Datos de motocicleta invalidos',
      details: errors,
      requestId: req.requestId,
    });
    return;
  }

  req.validatedMotorcycle = {
    name: name.trim(),
    maker: maker.trim(),
    category: category.trim(),
    year,
    displacement,
    price,
  };
  next();
}

module.exports = { validateMotorcycle };
