# Intermedio 07 — middleware de errores

API educativa para **Autos de lujo**. Return consistent API errors from one centralized Express error handler.

## Requisitos y ejecucion

- Node.js 20 o superior.
- Ejecuta `npm install` y luego `npm start` (por defecto, `http://localhost:3000`).
- Desarrollo: `npm run dev`; pruebas: `npm test`.

## Estructura

- `src/app.js`: configuracion de Express y endpoints.
- `src/repositories/catalog-repository.js`: datos en memoria; se reinician al detener el proceso.
- `src/services/catalog-service.js`: reglas reutilizables del catalogo.
- `src/server.js`: inicio del servidor.

## Ejemplos HTTP

```sh
curl http://localhost:3000/health
curl http://localhost:3000/api/v1/cars
curl -X POST http://localhost:3000/api/v1/cars -H "Content-Type: application/json" -d '{"name":"Demo Luxury cars","category":"Sample","rating":80,"year":2025}'
```

## Enfoque

Los errores esperados y los inesperados terminan en un middleware que normaliza el cuerpo JSON y el status.

## Validacion

`npm install` instala las dependencias; `npm test` ejecuta la suite del ejercicio. No se incluyen base de datos, secretos ni `node_modules`.
