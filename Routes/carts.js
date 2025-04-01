const express = require("express");
const { readFile, writeFile } = require("../utils/fileManager");
const router = express.Router();
const cartFile = "./data/carts.json";
const productsFile = "./data/products.json";

// Obtener el carrito
router.get("/", (req, res) => {
    res.json(readFile(cartFile));
});

// Agregar producto al carrito
router.post("/add/:productId", (req, res) => {
    let carts = readFile(cartFile);
    let products = readFile(productsFile);
    const productId = parseInt(req.params.productId);
    const product = products.find(p => p.id === productId);

    if (!product) return res.status(404).json({ error: "Producto no encontrado" });

    let cartItem = carts.find(item => item.id === productId);
    cartItem ? cartItem.quantity++ : carts.push({ id: productId, name: product.name, quantity: 1, price: product.price });

    writeFile(cartFile, carts);
    res.json({ message: "Producto agregado", cart: carts });
});

// Vaciar carrito
router.delete("/clear", (req, res) => {
    writeFile(cartFile, []);
    res.json({ message: "Carrito vaciado" });
});

module.exports = router;
