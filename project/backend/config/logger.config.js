import fs from "fs";
import path from "path";
import { createLogger, format, transports } from "winston";

const logDirectory = path.resolve("logs");
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

const logger = createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: format.combine(
    format.errors({ stack: true }),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.colorize({ all: true }),
    format.printf(({ timestamp, level, message, stack }) => {
      return `${timestamp} ${level}: ${stack || message}`;
    }),
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: path.join(logDirectory, "combined.log") }),
    new transports.File({ filename: path.join(logDirectory, "error.log"), level: "error" }),
  ],
  exitOnError: false,
});

logger.stream = {
  write: (message) => {
    logger.info(message.trim());
  },
};

export default logger;
