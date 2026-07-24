import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


async function connectDB() {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("mongodb connected...");
}
export default connectDB;