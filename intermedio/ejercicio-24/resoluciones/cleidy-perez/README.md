# Catalogo de formulas quimicas

API Express para consultar formulas quimicas. El enfoque es probar el servicio de dominio directamente, separado de Express y del acceso al repositorio.

## Requisitos y ejecucion

Se requiere Node.js 20 o superior.

```bash
npm install
npm test
npm start
```

La API escucha en `http://localhost:3000`; `npm run dev` inicia el modo watch.

## Endpoints

| Metodo | Ruta | Descripcion |
| --- | --- | --- |
| GET | `/health` | Estado del servicio. |
| GET | `/api/formulas` | Lista las formulas. |
| GET | `/api/formulas/:id` | Consulta una formula. |
| POST | `/api/formulas` | Agrega una formula. |

```bash
curl http://localhost:3000/api/formulas
curl -X POST http://localhost:3000/api/formulas -H "Content-Type: application/json" -d "{\"name\":\"Sal\",\"formula\":\"NaCl\",\"use\":\"Conservacion de alimentos\"}"
```

El servicio valida sus datos de entrada y lanza un error `400` ante una formula incompleta. `npm test` comprueba listado, busqueda, creacion y validacion usando `node:test` y `node:assert/strict`, sin levantar el servidor.
