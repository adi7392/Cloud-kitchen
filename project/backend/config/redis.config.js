import dotenv from "dotenv";
dotenv.config();

import { createClient } from "redis";
import logger from "./logger.config.js";

const REDIS_URL = process.env.REDIS_URL;

// On Vercel (serverless), skip Redis if no URL is configured
if (!REDIS_URL || REDIS_URL.includes("localhost")) {
  logger.warn("Redis: No valid REDIS_URL found. Skipping Redis — app will run without caching.");
}

const redisClient = createClient({
  url: REDIS_URL || "redis://localhost:6379",
  socket: {
    reconnectStrategy: (retries) => {
      if (retries > 3) {
        logger.warn("Redis: max reconnect attempts reached. Giving up.");
        return false;
      }
      return Math.min(retries * 200, 2000);
    },
  },
});

redisClient.on("connect", () => {
  logger.info("Redis connected...");
});

redisClient.on("error", (err) => {
  logger.error("Redis error: %s", err.message);
});

// Only attempt connection if a real Redis URL is provided
if (REDIS_URL && !REDIS_URL.includes("localhost")) {
  try {
    await redisClient.connect();
  } catch (err) {
    logger.error("Redis connection failed: %s", err.message);
    logger.warn("App will continue without caching.");
  }
}

export default redisClient;
