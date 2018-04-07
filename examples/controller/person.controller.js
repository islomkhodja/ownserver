module.exports = (Person) => {
  return  {
    getAll : async (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      let result = await Person.getList();
      res.end(JSON.stringify(result));
    },

    getById : async (args, req, res) => {
      res.setHeader('Content-Type', 'application/json');
      let result = await Person.getById(parseInt(args[1]));
      res.end(JSON.stringify(result[0]));
    },

    updateById : async (args, req, res) => {
      res.setHeader('Content-Type', 'application/json');

      req.on('data', async (chunk) => {
          const { name, date_of_birth, address, country, email } = JSON.parse(chunk);
          res.end(JSON.stringify(await Person.update(parseInt(args[1]), { name, date_of_birth, address, country, email })));
        });
    },


    deleteById : async (args, req, res) => {
      res.setHeader('Content-Type', 'application/json');
      let result = await Person.delete(parseInt(args[1]));
      res.end(JSON.stringify(result[0])); 
    },


    create : async (req, res) => {
      res.setHeader('Content-Type', 'application/json');
        req.on('data', async (chunk) => {
          const data = JSON.parse(chunk);
          res.end(JSON.stringify(await Person.insert(data)));
        });
    }
  } // return end
}