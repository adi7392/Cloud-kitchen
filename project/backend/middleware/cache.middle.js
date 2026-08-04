import redisClient from "../config/redis.config.js";
import logger from "../config/logger.config.js";

const isRedisReady = () => {
  try {
    return redisClient && redisClient.isReady;
  } catch {
    return false;
  }
};

/**
 * Cache middleware - checks Redis for cached response
 * @param {number} duration - Cache TTL in seconds (default: 60)
 */
const cache = (duration = 60) => {
  return async (req, res, next) => {
    if (req.method !== "GET" || !isRedisReady()) return next();

    const key = `cache:${req.originalUrl}`;

    try {
      const cachedData = await redisClient.get(key);

      if (cachedData) {
        return res.status(200).json(JSON.parse(cachedData));
      }

      const originalJson = res.json.bind(res);
      res.json = (body) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          redisClient
            .setEx(key, duration, JSON.stringify(body))
            .catch(() => {});
        }
        return originalJson(body);
      };

      next();
    } catch (err) {
      logger.error("Cache middleware error: %s", err.message);
      next();
    }
  };
};

/**
 * Invalidate cache by pattern
 * @param {string} pattern - Key pattern to delete
 */
const invalidateCache = async (pattern) => {
  if (!isRedisReady()) return;
  try {
    const keys = await redisClient.keys(pattern);
    if (keys.length > 0) {
      await redisClient.del(keys);
    }
  } catch (err) {
    logger.error("Cache invalidation error: %s", err.message);
  }
};

export { cache, invalidateCache };
