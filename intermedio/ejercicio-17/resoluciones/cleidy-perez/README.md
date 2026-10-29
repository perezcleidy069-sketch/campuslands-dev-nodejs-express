# Intermedio 17 — roles y permisos

API educativa para **Viajes**. Guard operations by role and explicit permission rather than authentication alone.

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
curl http://localhost:3000/api/v1/trips
curl -X POST http://localhost:3000/api/v1/trips -H "Content-Type: application/json" -d '{"name":"Demo Travel","category":"Sample","rating":80,"year":2025}'
```

## Enfoque

La cuenta `admin@example.test` tiene permiso de escritura; `reader@example.test` solo lectura. Las credenciales son ficticias y la lista de roles es educativa.

## Validacion

`npm install` instala las dependencias; `npm test` ejecuta la suite del ejercicio. No se incluyen base de datos, secretos ni `node_modules`.
