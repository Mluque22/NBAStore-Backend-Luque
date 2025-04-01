const express = require("express");
const app = express();
const PORT = 8080;
const path = require("path");

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Importar rutas
const productsRouter = require("./routes/products");
const cartsRouter = require("./routes/carts");

app.use("/products", productsRouter);
app.use("/carts", cartsRouter);

// Ruta principal
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
