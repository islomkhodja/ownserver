const jayson = require('jayson/promise');

module.exports = (Person) => {
  
  const server = jayson.server({
    getAll : async (args) => {
      console.log("json rpc");
      let result = await Person.getList();
      return result;
    }
  });



  return server;
}