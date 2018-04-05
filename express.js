const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
	console.log("sdsadas");
	res.send('test');	
})

app.listen(3001);