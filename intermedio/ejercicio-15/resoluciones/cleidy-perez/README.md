# Intermedio 15 — JWT basico

API educativa para **Comida callejera**. Issue and validate short-lived HMAC-signed JSON web tokens using Node crypto.

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
curl http://localhost:3000/api/v1/stalls
curl -X POST http://localhost:3000/api/v1/stalls -H "Content-Type: application/json" -d '{"name":"Demo Street food","category":"Sample","rating":80,"year":2025}'
```

## Enfoque

Inicia sesion en `POST /api/v1/auth/login` con `demo-pass` para recibir un JWT firmado con HMAC; define `JWT_SECRET` fuera del repositorio al desplegar.

## Validacion

`npm install` instala las dependencias; `npm test` ejecuta la suite del ejercicio. No se incluyen base de datos, secretos ni `node_modules`.
