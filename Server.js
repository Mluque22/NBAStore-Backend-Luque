const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
const exphbs = require("express-handlebars");
const { readFile } = require("./utils/fileManager");
const app = express();
const PORT = 8080;
const server = http.createServer(app);
const io = socketIo(server);


io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado");


    socket.emit("updateProducts", readFile("./data/products.json"));

    socket.on("disconnect", () => {
        console.log("Cliente desconectado");
    });
});


app.engine("handlebars", exphbs.create({ defaultLayout: "main" }).engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));


app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


const productsRouter = require("./routes/products");
const cartsRouter = require("./routes/carts");

app.use("/products", productsRouter);
app.use("/carts", cartsRouter);


app.get("/", (req, res) => {
    res.render("home");
});


app.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts");
});


app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});


server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
