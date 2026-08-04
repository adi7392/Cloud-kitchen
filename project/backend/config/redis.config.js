import dotenv from "dotenv";
dotenv.config();

import { createClient } from "redis";
import logger from "./logger.config.js";

const REDIS_URL = process.env.REDIS_URL;
const isExternalRedis = REDIS_URL && !REDIS_URL.includes("localhost");

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

redisClient.on("connect", () => logger.info("Redis connected..."));
redisClient.on("error", (err) => logger.error("Redis error: %s", err.message));

if (isExternalRedis) {
  try {
    await redisClient.connect();
  } catch (err) {
    logger.error("Redis connection failed: %s", err.message);
    logger.warn("App will continue without caching.");
  }
} else {
  logger.warn("Redis: No valid REDIS_URL found. Running without cache.");
}

export default redisClient;
