# Intermedio 05 — repositorios en memoria

API educativa para **Futbol**. Keep club records in an in-memory repository and manage a small league catalog.

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
curl http://localhost:3000/api/v1/clubs
curl -X POST http://localhost:3000/api/v1/clubs -H "Content-Type: application/json" -d '{"name":"Demo Football","category":"Sample","rating":80,"year":2025}'
```

## Enfoque

El controlador usa un servicio que depende de un repositorio en memoria; sustituirlo por otra implementacion no cambia la API.

## Validacion

`npm install` instala las dependencias; `npm test` ejecuta la suite del ejercicio. No se incluyen base de datos, secretos ni `node_modules`.
