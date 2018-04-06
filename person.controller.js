const Person = require('./Model.js');

exports.getAll = async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	let result = await Person.getList();
	res.end(JSON.stringify(result));
}

exports.getById = async (args, req, res) => {
	res.setHeader('Content-Type', 'application/json');
	let result = await Person.getById(parseInt(args[1]));
	res.end(JSON.stringify(result[0]));
}

exports.updateById = async (args, req, res) => {
	res.setHeader('Content-Type', 'application/json');

	req.on('data', async (chunk) => {
	    const { name, date_of_birth, address, country, email } = JSON.parse(chunk);
	    res.end(JSON.stringify(await Person.update(parseInt(args[1]), { name, date_of_birth, address, country, email })));
    });
}


exports.deleteById = async (args, req, res) => {
	res.setHeader('Content-Type', 'application/json');
	let result = await Person.delete(parseInt(args[1]));
	res.end(JSON.stringify(result[0]));	
}


exports.create = async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
    req.on('data', async (chunk) => {
      const data = JSON.parse(chunk);
      res.end(JSON.stringify(await Person.insert(data)));
    });
}	