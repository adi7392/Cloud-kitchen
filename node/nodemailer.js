import express from 'express';
import fs from 'fs';
import nodemailer from 'nodemailer';


const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "gear.upthe.heights@gmail.com",
    pass: "degl xclc euaj bfhh",
  }
});

const mailOptions = {
  from: "gear.up.the.heights@gmail.com",
    to: "swatantra3577@gmail.com",
  subject: "Test Email",
  text: "priya i love you.",
};

transporter.sendMail(mailOptions, (error, data) => {
    if (error) {
        console.error(error);
    } else {
        console.log('Email sent successfully!');
    }
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

