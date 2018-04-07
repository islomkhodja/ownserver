var jayson = require('jayson/promise');
var client = jayson.client.http('http://localhost:3000/api');

(async () => {
    try{

    let result = await client.request('getAll', [1]);

    console.log(result);
    
    } catch(err) {
      console.log(err);
    }

})()