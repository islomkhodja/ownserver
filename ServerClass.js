const slice = Array.prototype.slice;

class Server {
	constructor() {
		function app(req, res, next) {
			app.handle(req, res, next);
		}

		app.middlewares = this.middlewares = [];
		app.routes = this.routes = {};
		app.setMiddleWare = this.setMiddleWare;
		app.setRoute = this.setRoute;
		app.handle = this.handle;

		return app; 
	}

	setMiddleWare(fn) {
		this.middlewares.push(fn);
		return this;
	}

	setRoute(path) {
		let routingSettings = slice.call(arguments);
		// console.log(routingSettings);
		// var a = {};

		this.routes[path] = {};
		for(let i = 1; i < routingSettings.length; i++) {
			let method = routingSettings[i].method;
			let handler = routingSettings[i].handler;
			this.routes[path][method] = handler;
		}
				
		return this;
	}

	handle(req, res, done) {
		req =  


		let layer = this.routes[req.url];
		if(!layer) {
			return done("Not found");
		}

		layer[req.method](req, res, done);
	}

	listen() {

	}

	_decoratorForRequest(req) {
		req.send = 
	}

	_decoratorForResponse() {

	}
}

module.exports = Server;