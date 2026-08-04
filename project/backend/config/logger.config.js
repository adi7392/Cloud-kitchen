import { createLogger, format, transports } from "winston";

const isVercel = process.env.VERCEL === "1" || !process.env.LOG_TO_FILE;

const loggerTransports = [new transports.Console()];

// Only write to file locally, not on Vercel (read-only filesystem)
if (!isVercel) {
  const fs = await import("fs");
  const path = await import("path");
  const logDirectory = path.default.resolve("logs");
  if (!fs.default.existsSync(logDirectory)) {
    fs.default.mkdirSync(logDirectory, { recursive: true });
  }
  const { default: pathMod } = await import("path");
  loggerTransports.push(
    new transports.File({ filename: pathMod.join(logDirectory, "combined.log") }),
    new transports.File({ filename: pathMod.join(logDirectory, "error.log"), level: "error" }),
  );
}

const logger = createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: format.combine(
    format.errors({ stack: true }),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message, stack }) => {
      return `${timestamp} ${level}: ${stack || message}`;
    }),
  ),
  transports: loggerTransports,
  exitOnError: false,
});

logger.stream = {
  write: (message) => {
    logger.info(message.trim());
  },
};

export default logger;
