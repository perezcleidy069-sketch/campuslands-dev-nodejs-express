# Intermedio 14 — autenticacion simulada

API educativa para **Libros**. Demonstrate a local, simulated sign-in flow without a database or real identity provider.

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
curl http://localhost:3000/api/v1/books
curl -X POST http://localhost:3000/api/v1/books -H "Content-Type: application/json" -d '{"name":"Demo Books","category":"Sample","rating":80,"year":2025}'
```

## Enfoque

Demo local: `POST /api/v1/auth/login` con `{"email":"reader@example.test","password":"demo-pass"}`; el token es simulado y no autentica contra un proveedor real.

## Validacion

`npm install` instala las dependencias; `npm test` ejecuta la suite del ejercicio. No se incluyen base de datos, secretos ni `node_modules`.
