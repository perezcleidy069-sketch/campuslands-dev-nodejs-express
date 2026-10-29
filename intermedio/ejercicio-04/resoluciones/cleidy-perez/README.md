# Intermedio 04 — servicios reutilizables

API educativa para **Battle Royale**. Players enter a drop zone, collect loot, and compare combat stats.

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
curl http://localhost:3000/api/v1/survivors
curl -X POST http://localhost:3000/api/v1/survivors -H "Content-Type: application/json" -d '{"name":"Demo Battle Royale","category":"Sample","rating":80,"year":2025}'
```

## Enfoque

El endpoint `POST /api/v1/battles/simulate` reutiliza el servicio de batalla para evaluar el puntaje de supervivencia y botin.

## Validacion

`npm install` instala las dependencias; `npm test` ejecuta la suite del ejercicio. No se incluyen base de datos, secretos ni `node_modules`.
