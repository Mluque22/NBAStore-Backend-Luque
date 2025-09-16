import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import passport from "passport";
import path from "path";
import { fileURLToPath } from "url";
import { engine } from "express-handlebars";

import productsRouter from "./routes/products.js";
import cartsRouter from "./routes/carts.js";
import sessionsRouter from "./routes/sessions.js";
import viewsRouter from "./routes/views.js";
import mocksRouter from "./routes/mocks.router.js";
import usersRouter from "./routes/users.js";
import petsRouter from "./routes/pets.js";

import initializePassport from "./config/passport.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URL || "mongodb://localhost:27017/nba-store";

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Passport (JWT desde cookie)
initializePassport();
app.use(passport.initialize());

// Static (sin servir index.html por defecto)
app.use(express.static(path.join(__dirname, "public"), { index: false }));

// Views - Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/mocks", mocksRouter);
app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);

// Health
app.get("/health", (_req, res) => res.json({ ok: true }));

// 404
app.use((req, res) => {
  if (req.originalUrl.startsWith("/api/")) {
    return res.status(404).json({ error: "Not found" });
  }
  res.status(404).render("404", { title: "No encontrado" });
});

// Error handler
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// DB + Start
mongoose.connect(MONGODB_URI).then(() => {
  console.log("✅ MongoDB conectado");
  app.listen(PORT, () => console.log(`🚀 Server listening on http://localhost:${PORT}`));
}).catch((err) => {
  console.error("❌ Error conectando MongoDB:", err);
  process.exit(1);
});
