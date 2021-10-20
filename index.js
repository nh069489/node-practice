const http = require('http');
const {handleReqRes} = require('./handeReqRes/handleReqRes');
const app = {};
app.config ={
    port:3000
}

app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, ()=>{
        console.log(`The server is listening to the ${app.config.port}`)
    })
}
app.handleReqRes = handleReqRes;
app.createServer();