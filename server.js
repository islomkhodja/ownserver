var finalhandler = require('finalhandler')
var http         = require('http')
// var Router       = require('router')

// var router = Router()
// console.log(router.get.toString())
// router.get('/', function (req, res) {
//   res.setHeader('Content-Type', 'text/plain; charset=utf-8')
//   res.end('Hello World!')
// })
// router.get('/salom', (req, res) => {
// 	res.end('dunyo')
// })

// router.get('/salom/dunyo', (req, res, next) => {
// 	// res.end("hello world")
// 	console.log('first function of route');
// 	next()
// }, (req, res, next) => {
// 	// console.log(req, res, next);	
// 	console.log('second function of route');
// 	res.end('hello world');
// })


// 

const Server = require('./ServerClass');
const server = new Server();
// console.log(server);

server.setMiddleWare((req, res) => {
	console.log("this is middle ware");
}).setMiddleWare((req, res) => {
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
	handler: (req, res) => {
		res.end('This is person')
	},
}, {
	method: "POST",
	handler: (req, res) => {
		res.end('hohohoho');
	}
});

server.setRoute("/person/list", {
	method:"GET",
	handler: (req, res) => {
		res.end('')
	}
});



http.createServer(function(req, res) {
  	server(req, res, finalhandler(req, res))
}).listen(3000);

console.log(server);
// console.log(server["routes"][""])


// console.log(server.routes[0].options)
// http.createServer(function(req, res) {
//   server(req, res, finalhandler(req, res))
// }).listen(3000);