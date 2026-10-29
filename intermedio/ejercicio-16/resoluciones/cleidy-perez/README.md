# Intermedio 16 — rutas protegidas

API educativa para **Sneakers**. Require authentication for write operations while leaving the catalog readable.

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
curl http://localhost:3000/api/v1/sneakers
curl -X POST http://localhost:3000/api/v1/sneakers -H "Content-Type: application/json" -d '{"name":"Demo Sneakers","category":"Sample","rating":80,"year":2025}'
```

## Enfoque

El catalogo es publico, pero `POST /api/v1/sneakers` necesita `Authorization: Bearer <token>`; inicia sesion para obtenerlo.

## Validacion

`npm install` instala las dependencias; `npm test` ejecuta la suite del ejercicio. No se incluyen base de datos, secretos ni `node_modules`.
