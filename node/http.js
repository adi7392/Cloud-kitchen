// import http from 'http';

// const server = http.createServer((req, res) => {
//     // if (req.url === '/') {
//     //     res.end('Hello, World!');
//     // }else if (req.url === '/login') {
//     //     res.end('Login Page');
//     // }
//     // else if (req.url === '/contact') {
//     //     res.end('Contact Page');
//     // }
//     // else {
//     //     res.statusCode = 404;
//     //     res.end('Page Not Found');
//     // }
// if (req.url === '/' && req.method === 'POST') {
//     let body = '';
//     req.on("data", (chunk) => {
//         body += chunk;
//     });
//     req.on("end", () => {
//         console.log(JSON.parse(body));
//         res.end('Data received');
//     });  
// }       

// };


// server.listen(3000, () => {
//     console.log('Server is running on http://localhost:3000');
// });

import http from "http";

const server = http.createServer((req, res) => {

    if (req.url === "/" && req.method === "POST") {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {
            console.log(JSON.parse(body));
            res.end("Data received");
        });
    }

});   // <-- createServer closes here

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});