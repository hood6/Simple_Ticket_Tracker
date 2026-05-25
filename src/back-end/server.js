import { routes } from './routes/routes.js';
import * as http from 'http';
import * as fs from 'fs';

const server = http.createServer((req, res) => {
    try {
        let ret = JSON.stringify(routes);
        const url = req.url;
        // This should probably be a regex or a switch.
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
    }
    catch(e){
        console.log(e);
    }
});

const port = 3000;
server.listen(port, () => {
    console.log("Node.js server.js is running.");
});