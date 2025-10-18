import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/nba_store";

mongoose.connect(MONGODB_URI).then(() => {
  console.log("✅ MongoDB conectado");
  app.listen(PORT, () => console.log(`🚀 Server listening on http://localhost:${PORT}`));
}).catch((err) => {
  console.error("❌ Error conectando MongoDB:", err);
  process.exit(1);
});
