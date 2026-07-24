import express from "express";
import connectDB from "./config/db.config.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.listen();
