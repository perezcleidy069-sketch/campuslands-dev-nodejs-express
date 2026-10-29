# Inventario integrado de motocicletas

API Express para administrar inventario de motos. Integra rutas modulares, controladores, servicios, repositorio en memoria, validacion, busqueda, filtros, orden, paginacion, request ID, manejo centralizado de errores y escritura protegida por autenticacion simulada.

## Requisitos y ejecucion

Node.js 20 o superior.

```bash
npm install
npm test
npm start
```

Servidor: `http://localhost:3000`; desarrollo: `npm run dev`.

## Autenticacion de demostracion

El inicio de sesion es local y no sustituye un proveedor de identidad:

```bash
curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"mechanic@example.test\",\"password\":\"demo-pass\"}"
```

Usa el `token` devuelto como `Authorization: Bearer <token>` al crear una moto. El token y las cuentas demo viven solo en memoria.

## Endpoints

| Metodo | Ruta | Acceso | Descripcion |
| --- | --- | --- | --- |
| GET | `/health` | Publico | Estado y request ID. |
| POST | `/api/auth/login` | Publico | Inicia sesion de demostracion. |
| GET | `/api/motorcycles` | Publico | Lista con `q`, `category`, `page`, `limit`, `sortBy` y `order`. |
| GET | `/api/motorcycles/:id` | Publico | Consulta detalle. |
| POST | `/api/motorcycles` | Mecanico autenticado | Agrega una moto validada. |

Ejemplo de listado:

```bash
curl "http://localhost:3000/api/motorcycles?q=trail&category=adventure&page=1&limit=5&sortBy=price&order=asc"
```

La respuesta de lista contiene `data` y `pagination`. Respuestas de validacion, autenticacion y recurso inexistente usan `400`, `401` y `404`, respectivamente; todas incluyen el request ID.

## Pruebas

`npm test` usa `node:test` y `fetch` contra un servidor HTTP en puerto efimero para verificar request ID, consulta paginada, autenticacion, validacion y errores.
