# ownserver


```javascript
const http = require('http');
const finalhandler = require('finalhandler');
const Server = require('../');
const server = new Server();

server.setRoute('/', {
  method: "GET",
  handler: (req, res) => {
    res.end('This is main page')
  },
})

server.setRoute('/:1/:2', {
  method: "GET",
  handler: (args, req, res, err) => {
    res.end('This is main page', args[1], args[2]);
  }
}, {
  method: "POST",
  handler: (args, req, res, err) => {
    res.end("this is sparta!!");  
  }
});

http.createServer(function(req, res) {
  server(req, res, finalhandler(req, res))
}).listen(3000);

```

example papkasida ham bor..
