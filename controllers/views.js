import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Product from "../models/Product.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "..");

export const renderHome = async (req, res, next) => {
  try {
    let products = await Product.find().lean();
    if (!products || products.length === 0) {
      // Fallback al JSON local si la DB no tiene productos aún
      const dataPath1 = path.join(rootDir, "data", "products.json");
      const dataPath2 = path.join(rootDir, "Data", "products.json");
      const p = fs.existsSync(dataPath1) ? dataPath1 : (fs.existsSync(dataPath2) ? dataPath2 : null);
      if (p) {
        products = JSON.parse(fs.readFileSync(p, "utf8"));
      } else {
        products = [];
      }
    }
    res.render("home", { title: "NBA Store", products });
  } catch (e) { next(e); }
};

export const renderRealTime = (_req, res) => {
  res.render("realTimeProducts", { title: "Real Time Products" });
};
