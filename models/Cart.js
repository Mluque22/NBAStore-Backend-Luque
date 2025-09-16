import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, default: 1, min: 1 }
}, { _id: false });

const cartSchema = new mongoose.Schema({
  items: { type: [cartItemSchema], default: [] },
  status: { type: String, enum: ["active", "completed"], default: "active" }
}, { timestamps: true });

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
