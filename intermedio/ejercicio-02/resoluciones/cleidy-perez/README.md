# API de shooters competitivos

Ejercicio de routers modulares con Express. La API separa las rutas de jugadores y partidas; cada ruta delega las peticiones a un controlador y este a un servicio con datos en memoria.

## Requisitos

- Node.js 20 o superior.

## Instalacion y ejecucion

```bash
npm install
npm run dev
```

El servidor queda disponible en `http://localhost:3000`. Para ejecutarlo sin modo de desarrollo:

```bash
npm start
```

## Endpoints

| Metodo | Ruta | Descripcion |
| --- | --- | --- |
| GET | `/health` | Comprueba que la API esta activa. |
| GET | `/api/players` | Lista los jugadores. |
| GET | `/api/players/:id` | Obtiene un jugador por su ID. |
| POST | `/api/players` | Registra un jugador. |
| GET | `/api/matches` | Lista las partidas. |
| GET | `/api/matches/:id` | Obtiene una partida por su ID. |
| POST | `/api/matches` | Registra una partida. |

### Ejemplos con curl

Listar jugadores:

```bash
curl http://localhost:3000/api/players
```

Crear un jugador:

```bash
curl -X POST http://localhost:3000/api/players \
  -H "Content-Type: application/json" \
  -d "{\"gamerTag\":\"CleidyFPS\",\"rank\":\"Diamond\"}"
```

Crear una partida:

```bash
curl -X POST http://localhost:3000/api/matches \
  -H "Content-Type: application/json" \
  -d "{\"map\":\"Ascent\",\"teams\":[{\"name\":\"Campus\",\"score\":13},{\"name\":\"Rivals\",\"score\":9}]}"
```

Consultar un jugador inexistente para comprobar la respuesta `404`:

```bash
curl http://localhost:3000/api/players/999
```

Los jugadores y partidas se guardan en memoria, por lo que los nuevos registros se pierden al reiniciar el servidor. Las respuestas de error usan JSON con las propiedades `ok` y `message`; las validaciones incorrectas responden `400` y los recursos inexistentes `404`.
