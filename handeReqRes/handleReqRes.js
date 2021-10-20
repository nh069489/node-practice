const { StringDecoder } = require('string_decoder');
const url = require('url');
const routes = require('../routes');
const { notFoundHandler } = require('../helpers/notFoundHandler');
const handler = {}
handler.handleReqRes = (req,res)=>{
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.path;
    const trimmedPath = path.replace(/^\/|\/$/g, '');
    const objectQuery = parsedUrl.query;
    const method = req.method.toLowerCase();
    const headers = req.headers;
    const requestProperties = {
        parsedUrl,
        path,
        trimmedPath,
        objectQuery,
        method,
        headers
    } 
    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;
    chosenHandler(requestProperties,(statusCode, payload)=>{
        statusCode = typeof(statusCode) === 'number' ? statusCode: 500;
        payload = typeof(payload) === 'object' ? payload : {};
        const payloadString = JSON.stringify(payload);
        res.writeHead(statusCode);
        res.end(payloadString); 
    });
    const decoder = new StringDecoder('utf-8');
    let realData = '';
    req.on('data', (buffer)=>{
        realData += decoder.write(buffer)
    })
    req.on('end',()=>{
        realData += decoder.end();
        console.log(realData);
        res.end("Hello world")
    })


    
}
module.exports = handler;