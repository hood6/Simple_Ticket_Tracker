const http = require('http');

const server = http.createServer((req, res) => {
    // res.writeHead(200, {"content-type": "text/html"});
    // res.write("<h2>Hello World</h2>");
    // res.end();
    const url = req.url;
});

const port = 3000;
server.listen(port, () => {
    console.log("Node.js server.js is running.");
});