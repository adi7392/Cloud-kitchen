import express from 'express';
import fs from 'fs';
// import helmet from 'helmet';
import morgan from 'morgan';

const app = express();
// app.use(helmet());
// app.use(morgan('embeded'));
app.use(express.json());
const PORT = 3000;
// let username = "aditya";
// let password = "adi7392";

// app.use((req, res, next) => {
//   console.log("middleware 1 called");
//   next();
// });
// app.use((req, res, next) => {
//   if (req.body.username === username && req.body.password === password) {
//     console.log("i am done with checking the username and password");
//     next();
//   } else {
//     res.end("username and password is not correct");
//   }
// });

// app.use ((req, res, next) => {
//   fs.appendFile("log.txt", `\n ${req.body.username} logged in at ${new Date()} and was accessing the route ${req.url}`, (err,data) =>{
//     if(err) return err;
//     console.log("data");
//     next();
//   });
// });
// app.post('/login', (req, res) => {
//   console.log(req.body);
//   fs.readFile("Home.html", 'utf-8', (err, data) => {
//     if (err) return err;
//     res.end(data);
//   });
// });

app.get("/", (req, res) => {
  res.end("Hello World!");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});