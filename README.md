# NBA Store (Fixed)

Proyecto Express + Mongo + Handlebars totalmente en **ESM**.

## Requisitos
- Node.js 18+
- MongoDB en localhost o Atlas
- Archivo `.env` (copiar desde `.env.example` y ajustar)

## Scripts
- `npm run dev` – inicia con nodemon
- `npm start` – inicia en producción
- `npm run seed` – importa productos de `data/products.json` en Mongo

## Rutas
- **Vistas**
  - `GET /` – home (lista de productos)
  - `GET /realtimeproducts` – demo realtime (estático)
- **API**
  - `GET /api/products` – lista
  - `POST /api/products` – crear
  - `GET /api/products/:id` – detalle
  - `PUT /api/products/:id` – actualizar
  - `DELETE /api/products/:id` – eliminar

  - `POST /api/carts` – crear carrito
  - `POST /api/carts/:cid/products/:pid` – agregar producto
  - `GET /api/carts/:cid` – obtener carrito

  - `POST /api/sessions/register`
  - `POST /api/sessions/login`
  - `GET /api/sessions/current` (JWT por cookie)

## Estructura
```
/Server.js
/models
/controllers
/routes
/views
/public
/data
/config
/middlewares
/utils
```


## Router de Mocks (`/api/mocks`)
- `GET /api/mocks/mockingusers` → devuelve **50 usuarios mock** en formato similar a Mongo (con `_id`, fechas, `__v`, etc.). **Password** es la encriptación de `"coder123"`, `role` aleatorio entre `"user"` y `"admin"`, `pets: []`.
- `GET /api/mocks/mockingpets` → devuelve **100 mascotas mock** (no persiste).
- `POST /api/mocks/generateData` → inserta en base de datos la cantidad indicada. Body JSON:
  ```json
  { "users": 50, "pets": 100 }
  ```
  Luego comprobá con:
  - `GET /api/users`
  - `GET /api/pets`

