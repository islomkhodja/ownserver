const slice = Array.prototype.slice;
const pathToRegexp = require('path-to-regexp');

class Server {
  constructor() {
    function app(req, res, next) {
      app.handle(req, res, next);
    }
    
    Object.setPrototypeOf(app, this);

    app.middlewares = [];
    app.routes = {};

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
    // first midlleware

    // this.middlewares.forEach(mdw => {
    //  mdw(req, res, done);
    // })

    // after route
    let pathUrl = req.url;
    let method = req.method;
    let routes = this.routes;

    let filteredRoute = Object.keys(routes).filter((path) => {
      let temp = pathToRegexp(path, [], {
          sensitive: true,
          strict: false,
          end: true
        }) 
      return temp.exec(pathUrl) !== null;
    });


    if(!filteredRoute[0]) {
      // console.log("sdfsdfsd")
      return done(new Error('not found'));
    }

    let args = pathToRegexp(filteredRoute[0], [], {
          sensitive: true,
          strict: false,
          end: true
        }).exec(pathUrl);


    let layer = routes[filteredRoute[0]];
    console.log('layer', layer);
    
    if(!layer) {
      return done("Not found");
    }

    if(args.length === 1) {
      layer[method]( req, res, done );
    } else {

      layer[method]( args, req, res, done );
    }
  }

  listen() {
    let server = http.createServer(this);
      return server.listen.apply(server, arguments);
  }
}

module.exports = Server;