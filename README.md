# 🏀 NBA Store - Backend Ecommerce

Proyecto final del curso **Backend II - Arquitectura Profesional**.  
Este ecommerce simula una tienda de productos de la NBA, desarrollada con una arquitectura robusta, segura y escalable.

---

## 📦 Tecnologías Utilizadas

- **Node.js**
- **Express.js**
- **MongoDB** (con Mongoose)
- **JWT** para autenticación
- **Passport.js**
- **Handlebars** para vistas
- **Nodemailer** para recuperación de contraseña
- **Socket.io** (opcional en `realTimeProducts`)
- **bcrypt** para hashing
- **dotenv** para variables de entorno


## ✅ Funcionalidades

### 🔐 Autenticación

- Registro y login con JWT.
- Middleware `authJWT` para proteger rutas.
- Endpoints protegidos según rol (`admin`, `user`).

### 👤 Roles y Autorización

- `admin`: puede crear, editar y eliminar productos.
- `user`: puede agregar productos a su carrito y comprar.

### 🛒 Carrito y Compras

- Creación y consulta de carritos.
- Lógica de compra:
  - Verificación de stock.
  - Generación de **Ticket**.
  - Eliminación del carrito al finalizar compra.

### 📄 Modelo Ticket

- `code` único (auto-generado)
- `amount` total de la compra
- `purchaser` (correo del usuario)
- `purchase_datetime` automático

### 📤 Recuperación de Contraseña

- Ruta para solicitar recuperación (`/api/sessions/recovery`)
- Envío de mail con link de restablecimiento
- Token expira a la hora
- No permite reutilizar la misma contraseña

### 🔒 Seguridad

- Contraseñas hasheadas con bcrypt
- Tokens JWT firmados con secreto del `.env`
- DTO para ocultar datos sensibles (`/api/sessions/current`)

---