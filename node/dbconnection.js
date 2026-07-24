import mongoose from "mongoose";
async function connectDB() {
    await mongoose.connect("mongodb+srv://adi7392:Adi7392@mern.lwidnej.mongodb.net/",);
    console.log("mongodb connected...");
}
export default connectDB;