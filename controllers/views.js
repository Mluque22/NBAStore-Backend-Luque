// controllers/views.js

const Product = require('../models/product');

const renderHome = async (req, res) => {
    try {
        const products = await Product.find().lean();
        res.render('home', { products });
    } catch (error) {
        console.error('Error al renderizar la vista principal:', error);
        res.status(500).send('Error interno del servidor');
    }
};

const renderRealTimeProducts = async (req, res) => {
    try {
        const products = await Product.find().lean();
        res.render('realTimeProducts', { products });
    } catch (error) {
        console.error('Error al renderizar productos en tiempo real:', error);
        res.status(500).send('Error interno del servidor');
    }
};

module.exports = {
    renderHome,
    renderRealTimeProducts,
};
