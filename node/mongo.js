// import mongoose from 'mongoose';
import connectDB from './dbconnection.js';
import express from 'express';
import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

const app = express();
// const result = mongoose.connect("mongodb+srv://adi7392:Adi7392@mern.lwidnej.mongodb.net/")
// .then(() => {
//   console.log("MongoDB Connected"); 
// })
// .catch((err) => {
//   console.log(err);
// });
connectDB();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});