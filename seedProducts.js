import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uri = process.env.MONGODB_URI || process.env.MONGO_URL || "mongodb://localhost:27017/nba-store";

const dataPath1 = path.join(__dirname, "data", "products.json");
const dataPath2 = path.join(__dirname, "Data", "products.json");
const dataPath = fs.existsSync(dataPath1) ? dataPath1 : (fs.existsSync(dataPath2) ? dataPath2 : null);

if (!dataPath) {
  console.error("No se encontró data/products.json ni Data/products.json");
  process.exit(1);
}

const products = JSON.parse(fs.readFileSync(dataPath, "utf8"));

try {
  await mongoose.connect(uri);
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log(`✅ Importados ${products.length} productos`);
} catch (e) {
  console.error("❌ Error importando productos:", e);
} finally {
  await mongoose.disconnect();
}
