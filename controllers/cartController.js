const Cart = require("../models/cart");
exports.getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find().populate("products.product");
        res.json(carts);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los carritos" });
    }
};
exports.createCart = async (req, res) => {
    try {
        const newCart = new Cart({ products: [] });
        await newCart.save();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el carrito" });
    }
};
