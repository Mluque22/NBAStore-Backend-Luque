const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
const exphbs = require("express-handlebars"); // Importamos el motor de plantillas
const { readFile } = require("./utils/fileManager"); // Importamos la función readFile

const app = express();
const PORT = 8080;

// Crear el servidor HTTP
const server = http.createServer(app);

// Crear la instancia de socket.io
const io = socketIo(server);

// Configuración de WebSocket
io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado");

    // Enviar los productos al cliente conectado
    socket.emit("updateProducts", readFile("./data/products.json"));

    socket.on("disconnect", () => {
        console.log("Cliente desconectado");
    });
});

// Configuración del motor de plantillas Handlebars
app.engine("handlebars", exphbs.create({ defaultLayout: "main" }).engine); // Usar create() para configurar
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Rutas
const productsRouter = require("./routes/products");
const cartsRouter = require("./routes/carts");

app.use("/products", productsRouter);
app.use("/carts", cartsRouter);

// Ruta para la vista principal
app.get("/", (req, res) => {
    res.render("home"); // Renderizar la vista de inicio
});

// Ruta para la vista en tiempo real de productos
app.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts"); // Renderizar la vista en tiempo real
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

// Iniciar servidor
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
