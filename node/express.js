import express from 'express';
import fs from 'fs';


const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());



app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.post('/login', (req, res) => {
  console.log(req.body);  
  res.send('Login Page');
});
app.get('/contact', (req, res) => {
  res.send('Contact Page');
});
app.get("/products", (req, res) => {
    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error reading products.json");
        }

        res.send(data);
    });
});
app.get("/aditya", (req, res) => {
    res.render("aditya.ejs");
});
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

