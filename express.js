// const express = require('express');
// const app = express();

// app.get('/', (req, res, next) => {
// 	console.log("sdsadas");
// 	res.send('test');	
// })

// app.listen(3001);

const pathToRegexp = require('path-to-regexp');


// var keys = [];
// var exp = pt('/foo/:bar', keys);
// console.log(keys);
// console.log(exp);
//keys = ['bar']
//exp = /^\/foo\/(?:([^\/]+?))\/?$/i



var re = pathToRegexp('/person/:foo/:bar')
// keys = [{ name: 'foo', prefix: '/', ... }, { name: 'bar', prefix: '/', ... }]
console.log(re);
console.log(re.exec('/person/2/3'));
//=> ['/test/route', 'test', 'route']