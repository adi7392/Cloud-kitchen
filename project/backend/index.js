import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);
import dotenv from "dotenv";
import connectDB from "./config/db.config.js";
import app from "./src/app.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`API Docs: http://localhost:${PORT}/api-docs`);
  });
});