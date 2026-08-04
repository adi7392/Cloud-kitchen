import mongoose from "mongoose";

async function connectDB() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error("MONGODB_URI environment variable is not set");
    }
    await mongoose.connect(uri);
    console.log("mongodb connected...");
}

export default connectDB;
