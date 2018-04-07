const finalhandler = require('finalhandler')
const http         = require('http')

const Server = require('../');
const server = new Server();

const knex = require('knex')({
  client: 'pg',
  connection: {
  host : '127.0.0.1',
  user : 'postgres',
  password : 'postgres',
  database : 'demo'
  }
});

const person = require('./model/Person')(knex);

person.create().then(data => console.log(data)).catch(err => console.log(err));

const controller = require('./controller/person.controller')(person);
const rpc = require('./controller/rpc.controller')(person);

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

server.setRoute("/api", {
  method: "POST",
  handler : async (req, res, next) => {
    req.on('data', async (chunk) => {
      const data = JSON.parse(chunk);
      req.body = data;
      console.log(req.body);
      rpc.middleware()(req, res, next);
    });
  }
})

http.createServer(function(req, res) {
  server(req, res, finalhandler(req, res))
}).listen(3000);

console.log(server);
