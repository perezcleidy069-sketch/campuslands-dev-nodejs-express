# Intermedio 20 — CORS controlado

API educativa para **Dibujo digital**. Allow browser requests only from explicitly configured origins.

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
curl http://localhost:3000/api/v1/brushes
curl -X POST http://localhost:3000/api/v1/brushes -H "Content-Type: application/json" -d '{"name":"Demo Digital drawing","category":"Sample","rating":80,"year":2025}'
```

## Enfoque

La lista de origenes permitidos se configura con `ALLOWED_ORIGINS` (lista separada por comas); otros origenes no reciben permiso CORS.

## Validacion

`npm install` instala las dependencias; `npm test` ejecuta la suite del ejercicio. No se incluyen base de datos, secretos ni `node_modules`.
