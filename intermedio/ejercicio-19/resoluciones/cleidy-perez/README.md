# Intermedio 19 — dotenv y config

API educativa para **Tatuajes**. Load runtime settings from environment variables with safe development defaults.

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
curl http://localhost:3000/api/v1/designs
curl -X POST http://localhost:3000/api/v1/designs -H "Content-Type: application/json" -d '{"name":"Demo Tattoos","category":"Sample","rating":80,"year":2025}'
```

## Enfoque

Copia `.env.example` a `.env` y cambia `PORT`; no se incluye ningun secreto ni archivo `.env`.

## Validacion

`npm install` instala las dependencias; `npm test` ejecuta la suite del ejercicio. No se incluyen base de datos, secretos ni `node_modules`.
