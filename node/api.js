import { v2 as cloudinary } from "cloudinary";
import express from "express";
import fs from "fs";
import multer from "multer";
const app = express();

const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded());

// const upload = multer({ dest: "uploads/" });

cloudinary.config({
  cloud_name: "xjazfwpo5",
  api_key: "757787559553667",
  api_secret: "J_qO2wOTmqwuWvfBGY2ULkRSKns",
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname);
  },
});

//vikas.png
//sadfghjkl
//dsfgh.png
const uploads = multer({ storage: storage });

// const upload = multer({ dest: "uploads/" });

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
    fs.unlinkSync(req.file.path); // Clean up the uploaded file on error
    res.status(500).send({
      message: "An error occurred during the upload.",
      error: error.message,
    });
  }
});
app.listen(PORT, () => {
  console.log("server running");
});