# Entrega avanzada — ejercicio 01

## API versionada para videojuegos RPG

API REST en Express con capas separadas de rutas, controlador/servicio y composición de aplicación. La funcionalidad central implementa **versioned** con estado en memoria; no requiere servicios externos.

## Requisitos y ejecución

- Node.js 20 o superior.
- `npm install`
- `npm test`
- `npm start` (servidor en `http://localhost:3000`).

## HTTP

Salud: `GET /health`

Listar: `GET /api/v1/characters`

Ejecutar la operación principal: `POST /api/v1/characters/actions`

```bash
curl http://localhost:3000/health
curl http://localhost:3000/api/v1/characters
curl -X POST http://localhost:3000/api/v1/characters/actions -H "Content-Type: application/json" -H "Idempotency-Key: demo-1" -H "x-role: instructor" -d '{"action":"create","name":"Lyra","class":"Maga","level":2}'
```

La operación de demostración es {"action":"create","name":"Lyra","class":"Maga","level":2}. Los datos se mantienen solo durante la vida del proceso.

Versiones: `GET /api/v1/characters` conserva el contrato básico; `GET /api/v2/characters` agrega `powerScore`.

## Estructura

- `src/app.js`: configura middleware y composición.
- `src/server.js`: inicia el listener HTTP.
- `src/routes/`: rutas HTTP.
- `src/services/`: reglas de negocio y estado simulado.
- `src/config/`: configuración segura con valores por defecto.
- `src/test/`: prueba de integración HTTP con `node:test`.
