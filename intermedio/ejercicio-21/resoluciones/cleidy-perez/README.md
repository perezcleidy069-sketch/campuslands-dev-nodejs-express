# Intermedio 21 — rate limit conceptual

API educativa para **Animacion 3D**. Apply a small per-process in-memory request limit and explain its limitations.

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
curl http://localhost:3000/api/v1/renders
curl -X POST http://localhost:3000/api/v1/renders -H "Content-Type: application/json" -d '{"name":"Demo 3D animation","category":"Sample","rating":80,"year":2025}'
```

## Enfoque

Limite didactico por IP en memoria; no reemplaza un limite distribuido y se reinicia al reiniciar el proceso.

## Validacion

`npm install` instala las dependencias; `npm test` ejecuta la suite del ejercicio. No se incluyen base de datos, secretos ni `node_modules`.
