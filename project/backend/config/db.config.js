import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "./logger.config.js";
dotenv.config();

async function connectDB() {
    await mongoose.connect(process.env.MONGO_URL);
    logger.info("mongodb connected...");
}
export default connectDB;