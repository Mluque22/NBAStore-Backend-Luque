import Product from "../models/Product.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().lean();
    res.json(products);
  } catch (e) { next(e); }
};

export const getProductById = async (req, res, next) => {
  try {
    const p = await Product.findById(req.params.id).lean();
    if (!p) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(p);
  } catch (e) { next(e); }
};

export const createProduct = async (req, res, next) => {
  try {
    const p = await Product.create(req.body);
    res.status(201).json(p);
  } catch (e) { next(e); }
};

export const updateProduct = async (req, res, next) => {
  try {
    const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!p) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(p);
  } catch (e) { next(e); }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const p = await Product.findByIdAndDelete(req.params.id);
    if (!p) return res.status(404).json({ error: "Producto no encontrado" });
    res.json({ message: "Producto eliminado" });
  } catch (e) { next(e); }
};
