import dotenv from "dotenv";
import { createClient } from "redis";

dotenv.config();

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
  socket: {
    reconnectStrategy: (retries) => {
      if (retries > 3) {
        console.warn("Redis: max reconnect attempts reached. Giving up.");
        return false; // stop retrying
      }
      return Math.min(retries * 200, 2000); // retry with backoff
    },
  },
});

redisClient.on("connect", () => {
  console.log("Redis connected...");
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err.message);
});

// Connect gracefully — don't crash the server if Redis is unavailable
try {
  await redisClient.connect();
} catch (err) {
  console.error("Redis connection failed:", err.message);
  console.warn("App will continue without caching.");
}

export default redisClient;