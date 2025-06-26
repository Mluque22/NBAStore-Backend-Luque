const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
router.get("/", cartController.getAllCarts);
router.post("/", cartController.createCart);
module.exports = router;