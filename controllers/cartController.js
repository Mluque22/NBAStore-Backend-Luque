import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const createCart = async (req, res, next) => {
  try {
    const cart = await Cart.create({ items: [] });
    res.status(201).json(cart);
  } catch (e) { next(e); }
};

export const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findById(req.params.cid).populate("items.product").lean();
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });
    res.json(cart);
  } catch (e) { next(e); }
};

export const addProductToCart = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const product = await Product.findById(pid);
    if (!product) return res.status(404).json({ error: "Producto no encontrado" });

    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

    const existing = cart.items.find(i => i.product.toString() === pid);
    if (existing) existing.quantity += 1;
    else cart.items.push({ product: pid, quantity: 1 });

    await cart.save();
    await cart.populate("items.product");
    res.json(cart);
  } catch (e) { next(e); }
};
