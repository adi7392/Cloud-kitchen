
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import swaggerUi from "swagger-ui-express";
import { fileURLToPath } from "url";
import logger from "../config/logger.config.js";
import swaggerSpec from "../config/swagger.config.js";
import adminRoute from "../routes/admin.route.js";
import authRoute from "../routes/auth.route.js";
import kitchenRoute from "../routes/kitchen.route.js";
import menuRoute from "../routes/menu.route.js";
import orderRoute from "../routes/order.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security middleware
app.use(helmet());

// CORS
app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }));

// Logger
app.use(morgan("combined", { stream: logger.stream }));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve frontend `dist` as static files from backend/public/dist
const frontendDist = path.join(__dirname, "..", "public", "dist");
app.use(express.static(frontendDist));

// Swagger API Docs
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Cloud Kitchen API Docs",
  }),
);

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/kitchens", kitchenRoute);
app.use("/api/v1/menu", menuRoute);
app.use("/api/v1/orders", orderRoute);

// Serve frontend index.html for all non-API routes (SPA support)
// Middleware to serve `index.html` for non-API GET requests (SPA support)
app.use((req, res, next) => {
  if (req.method !== "GET") return next();
  if (req.path.startsWith("/api/")) return next();
  res.sendFile(path.join(frontendDist, "index.html"));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  logger.error(err.stack || err.message);

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
  });
});

export default app;