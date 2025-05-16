const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
// Obtener todos los productos (JSON)
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear nuevo producto
router.post("/", async (req, res) => {
    try {
        const { name, price, team, stock, imageUrl } = req.body;
        const product = new Product({ name, price, team, stock, imageUrl });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
