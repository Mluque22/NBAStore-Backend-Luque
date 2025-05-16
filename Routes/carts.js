const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");

router.get("/", async (req, res) => {
    try {
        const carts = await Cart.find().populate("products.product");
        res.json(carts);
    } catch (error) {
        res.status(500).json({ message: "Error obteniendo carritos" });
    }
});

router.post("/", async (req, res) => {
    try {
        const newCart = new Cart({ products: [] });
        await newCart.save();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ message: "Error creando carrito" });
    }
});

module.exports = router;
