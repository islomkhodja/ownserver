const finalhandler = require('finalhandler')
const http         = require('http')

const Server = require('./ServerClass');
const server = new Server();

const controller = require('./person.controller');


server.setMiddleWare((req, res, err) => {
    console.log("this is middle ware");
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
    handler: controller.getAll,
}, {
    method: "POST",
    handler: controller.create
});

server.setRoute("/person/:1", {
    method:"GET",
    handler: controller.getById
}, {
    method: "PUT",
    handler: controller.updateById
}, {
    method: "DELETE",
    handler: controller.deleteById
});

http.createServer(function(req, res) {
    server(req, res, finalhandler(req, res))
}).listen(3000);

console.log(server);
