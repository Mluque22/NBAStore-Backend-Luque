import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  price: { type: Number, required: true },
  code: { type: String, required: true, unique: true },
  stock: { type: Number, default: 0 },
  category: { type: String, default: "general" },
  team: { type: String, default: "" },
  imageUrl: { type: String, default: "" }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
