# Entrega avanzada — ejercicio 21

## Concurrencia controlada para animación 3D

API REST en Express con capas separadas de rutas, controlador/servicio y composición de aplicación. La funcionalidad central implementa **concurrency** con estado en memoria; no requiere servicios externos.

## Requisitos y ejecución

- Node.js 20 o superior.
- `npm install`
- `npm test`
- `npm start` (servidor en `http://localhost:3000`).

## HTTP

Salud: `GET /health`

Listar: `GET /api/v1/renders`

Ejecutar la operación principal: `POST /api/v1/renders/actions`

```bash
curl http://localhost:3000/health
curl http://localhost:3000/api/v1/renders
curl -X POST http://localhost:3000/api/v1/renders/actions -H "Content-Type: application/json" -H "Idempotency-Key: demo-1" -H "x-role: instructor" -d '{"action":"simulate","ms":1}'
```

La operación de demostración es {"action":"simulate","ms":1}. Los datos se mantienen solo durante la vida del proceso.

## Estructura

- `src/app.js`: configura middleware y composición.
- `src/server.js`: inicia el listener HTTP.
- `src/routes/`: rutas HTTP.
- `src/services/`: reglas de negocio y estado simulado.
- `src/config/`: configuración segura con valores por defecto.
- `src/test/`: prueba de integración HTTP con `node:test`.
