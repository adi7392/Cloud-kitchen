import { v2 as cloudinary } from "cloudinary";
import express from "express";
import fs from "fs";
import multer from "multer";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage: storage });

app.get("/", (req, res) => {
  res.end("hello world");
});

app.post("/uploads", uploads.single("dp"), async (req, res) => {
  try {
    const file = req.file;
    const result = await cloudinary.uploader.upload(file.path);
    fs.unlinkSync(file.path);
    res.send(result);
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).send({
      message: "An error occurred during the upload.",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
