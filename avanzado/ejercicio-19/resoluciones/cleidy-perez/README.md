# Entrega avanzada — ejercicio 19

## Auditoría de acciones para tatuajes

API REST en Express con capas separadas de rutas, controlador/servicio y composición de aplicación. La funcionalidad central implementa **audit** con estado en memoria; no requiere servicios externos.

## Requisitos y ejecución

- Node.js 20 o superior.
- `npm install`
- `npm test`
- `npm start` (servidor en `http://localhost:3000`).

## HTTP

Salud: `GET /health`

Listar: `GET /api/v1/appointments`

Ejecutar la operación principal: `POST /api/v1/appointments/actions`

```bash
curl http://localhost:3000/health
curl http://localhost:3000/api/v1/appointments
curl -X POST http://localhost:3000/api/v1/appointments/actions -H "Content-Type: application/json" -H "Idempotency-Key: demo-1" -H "x-role: instructor" -d '{"action":"record","actor":"artist-1","operation":"confirm","target":"appointment-1"}'
```

La operación de demostración es {"action":"record","actor":"artist-1","operation":"confirm","target":"appointment-1"}. Los datos se mantienen solo durante la vida del proceso.

Auditoría: `GET /api/v1/appointments/audit`.

## Estructura

- `src/app.js`: configura middleware y composición.
- `src/server.js`: inicia el listener HTTP.
- `src/routes/`: rutas HTTP.
- `src/services/`: reglas de negocio y estado simulado.
- `src/config/`: configuración segura con valores por defecto.
- `src/test/`: prueba de integración HTTP con `node:test`.
