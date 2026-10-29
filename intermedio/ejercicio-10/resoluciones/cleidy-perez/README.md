# Intermedio 10 — ordenamiento de resultados

API educativa para **Ping pong**. Sort tournament players by rating, name, or wins in either direction.

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
curl http://localhost:3000/api/v1/players
curl -X POST http://localhost:3000/api/v1/players -H "Content-Type: application/json" -d '{"name":"Demo Ping-pong","category":"Sample","rating":80,"year":2025}'
```

## Enfoque

Ordena con `?sortBy=rating&order=desc`; solo se aceptan los campos permitidos.

## Validacion

`npm install` instala las dependencias; `npm test` ejecuta la suite del ejercicio. No se incluyen base de datos, secretos ni `node_modules`.
