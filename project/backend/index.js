import dotenv from "dotenv";
dotenv.config(); // ✅ Must be FIRST before any other imports that use process.env

import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

import connectDB from "./config/db.config.js";
import app from "./src/app.js";
import logger from "./config/logger.config.js";

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    logger.info(`Server is running at http://localhost:${PORT}`);
    logger.info(`API Docs: http://localhost:${PORT}/api-docs`);
  });
}).catch((err) => {
  logger.error("Failed to connect to DB: " + err.message);
  process.exit(1);
});
