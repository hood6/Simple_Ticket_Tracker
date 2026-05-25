import { routes } from './routes/routes.js';
import * as http from 'http';
import * as fs from 'fs';

const server = http.createServer((req, res) => {
    // res.writeHead(200, {"content-type": "text/html"});
    // res.write("<h2>Hello World</h2>");
    // res.end();
    let ret = JSON.stringify(routes);
    const url = req.url;
    for(let [key, val] of Object.entries(routes)) {
        if(key === `.${url}`) {
            ret = JSON.stringify(val.GET());
        }
    }
    // THIS ABSOLUTELY NEEDS TO BE CHANGED ONCE THIS GOES LIVE, DO NOT LEAVE THIS IN.
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(200, {"content-type": "application/json"});
    res.write(ret);
    res.end();
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