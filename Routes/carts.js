import { Router } from "express";
import { createCart, getCart, addProductToCart } from "../controllers/cartController.js";

const router = Router();

router.post("/", createCart);
router.get("/:cid", getCart);
router.post("/:cid/products/:pid", addProductToCart);

export default router;
