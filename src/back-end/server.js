import { routes } from './routes/routes.js';
import * as http from 'http';
import * as fs from 'fs';

const server = http.createServer((req, res) => {
    // res.writeHead(200, {"content-type": "text/html"});
    // res.write("<h2>Hello World</h2>");
    // res.end();
    const url = req.url;
    /* This code works, however they are not static pages and require additional logic from js files. */
    // const _dir = "../front-end/HTML/"
    // let fileName = "";
    // if(url === '/') {
    //     //fs.createReadStream('./src/front-end/HTML/MainPage.html').pipe(res);
    //     fileName = `${_dir}MainPage.html`;
    // }
    // fs.readFile(fileName, function (err, data) {
    //     if(err) {
    //         res.writeHead(500, {"content-type": "text/html"});
    //         res.write("<h2>500 Error</h2>");
    //         res.end("500 error");
    //         return;
    //     }
    //     res.writeHead(200, {"content-type": "text/html"});
    //     res.end(data);
    // });
});

const port = 3000;
server.listen(port, () => {
    console.log("Node.js server.js is running.");
});