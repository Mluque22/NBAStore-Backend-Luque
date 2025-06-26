const Product = require("../models/product");
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
};
exports.createProduct = async (req, res) => {
    try {
        const { name, price, team, stock, imageUrl } = req.body;
        const newProduct = new Product({ name, price, team, stock, imageUrl });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el producto" });
    }
};