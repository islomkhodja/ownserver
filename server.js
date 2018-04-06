var finalhandler = require('finalhandler')
var http         = require('http')


const Server = require('./ServerClass');
const server = new Server();
// console.log(server);

server.setMiddleWare((req, res, err) => {
    console.log("this is middle ware");
    // err(new Error("test"))
    // res.end("test");
}).setMiddleWare((req, res, err) => {
    console.log("this is seconds middleware");
})


server.setRoute('/', {
    method: "GET",
    handler: (req, res) => {
        res.end('This is main page')
    },
})

server.setRoute("/person",{
    method: "GET",
    handler: (req, res, next) => {
        console.log("route ichidagi ");
        res.end('This is person');

    },
}, {
    method: "POST",
    handler: (req, res) => {
        res.end('hohohoho');
    }
});

server.setRoute("/person/list/:1", {
    method:"GET",
    handler: (args, req, res) => {
        console.log(args);
        res.end('')
    }
});

server.setRoute("/person/list/:1/:2", {
    method:"GET",
    handler: (args, req, res) => {
        console.log(args);
        res.end('test')
    }
});



http.createServer(function(req, res) {
    server(req, res, finalhandler(req, res))
}).listen(3000);

console.log(server);
