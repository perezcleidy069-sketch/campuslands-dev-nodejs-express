# API de equipos MOBA

API pequena de equipos de esports MOBA creada para practicar controladores limpios. Las rutas conectan las peticiones HTTP con controladores, que validan la entrada y delegan el acceso a los datos al servicio.

## Requisitos

- Node.js 20 o superior.

## Instalacion y ejecucion

```bash
npm install
npm run dev
```

La API escucha en `http://localhost:3000`. Para ejecutarla sin el modo de desarrollo:

```bash
npm start
```

## Endpoints

| Metodo | Ruta | Descripcion |
| --- | --- | --- |
| GET | `/health` | Comprueba que la API esta activa. |
| GET | `/api/teams` | Lista los equipos disponibles. |
| GET | `/api/teams/:id` | Obtiene un equipo por su ID. |
| POST | `/api/teams` | Registra un equipo MOBA. |

### Ejemplos con curl

Listar equipos:

```bash
curl http://localhost:3000/api/teams
```

Crear un equipo:

```bash
curl -X POST http://localhost:3000/api/teams \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Dragons\",\"region\":\"LAN\"}"
```

Consultar un equipo inexistente para comprobar la respuesta `404`:

```bash
curl http://localhost:3000/api/teams/999
```

El nombre y la region son obligatorios; si falta alguno, la API responde `400`. Los equipos se guardan en memoria y los registros nuevos se pierden al reiniciar el servidor. Las respuestas usan JSON con la propiedad `ok`.
