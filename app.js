import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import path from "path";
import { fileURLToPath } from "url";
import { engine } from "express-handlebars";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import productsRouter from "./routes/products.js";
import cartsRouter from "./routes/carts.js";
import sessionsRouter from "./routes/sessions.js";
import viewsRouter from "./routes/views.js";
import mocksRouter from "./routes/mocks.router.js";
import usersRouter from "./routes/users.js";
import petsRouter from "./routes/pets.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, "public"), { index: false }));


app.engine("handlebars", engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/mocks", mocksRouter);
app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);


const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "NBA Store API",
      version: "1.0.0",
      description: "API documentation (Users module)",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./routes/users.js", "./controllers/userController.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Basic error handler
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

export default app;
