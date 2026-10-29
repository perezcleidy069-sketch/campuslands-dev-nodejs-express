# Intermedio 18 — hash de passwords conceptual

API educativa para **Paracaidismo**. Show how password derivation works with scrypt; never store or return plaintext passwords.

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
curl http://localhost:3000/api/v1/jumps
curl -X POST http://localhost:3000/api/v1/jumps -H "Content-Type: application/json" -d '{"name":"Demo Skydiving","category":"Sample","rating":80,"year":2025}'
```

## Enfoque

Registra con `POST /api/v1/auth/register`; se deriva una clave con scrypt y sal aleatoria. Es una demostracion didactica, no un sistema de cuentas listo para produccion.

## Validacion

`npm install` instala las dependencias; `npm test` ejecuta la suite del ejercicio. No se incluyen base de datos, secretos ni `node_modules`.
