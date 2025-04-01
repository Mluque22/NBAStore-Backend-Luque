const express = require("express");
const { readFile, writeFile } = require("../utils/fileManager");
const router = express.Router();
const filePath = "./data/products.json";

// Obtener todos los productos
router.get("/", (req, res) => {
    res.json(readFile(filePath));
});

// Obtener un producto por ID
router.get("/:id", (req, res) => {
    const products = readFile(filePath);
    const product = products.find(p => p.id === parseInt(req.params.id));
    product ? res.json(product) : res.status(404).json({ error: "Producto no encontrado" });
});

// Agregar un nuevo producto
router.post("/", (req, res) => {
    let products = readFile(filePath);
    const { name, price, team, stock } = req.body;

    if (!name || !price || !team || !stock) return res.status(400).json({ error: "Faltan datos" });

    const newProduct = { id: products.length + 1, name, price, team, stock };
    products.push(newProduct);
    writeFile(filePath, products);

    res.json({ message: "Producto agregado", product: newProduct });
});

module.exports = router;
