const Product = require('../models/product');
exports.renderHome = async (req, res) => {
    try {
        const products = await Product.find().lean();
        res.render('home', { products });
    } catch (error) {
        res.status(500).send('Error interno del servidor');
    }
};
exports.renderRealTimeProducts = async (req, res) => {
    try {
        const products = await Product.find().lean();
        res.render('realTimeProducts', { products });
    } catch (error) {
        res.status(500).send('Error interno del servidor');
    }
};