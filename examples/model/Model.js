class Model {
  constructor(name, knex, schema) {
    this.name = name;
    this.knex = knex;
    this.schema = schema;
  }

  async create() {
    console.log("ishladimi")
    let exist = await this.knex.schema.withSchema('public').hasTable(this.name);
    if(!exist) 
      return this.knex.schema.withSchema('public').createTable(this.name, function (table) {
        Object.keys(this.schema).forEach(key => {
          console.log("column")
            switch(this.schema[key]) {
              case "text":
                table.text(key);
                break;
              case "string":
                table.string(key);
                break;
              case "float":
                table.float(key);
                break;
              case "decimal":
                table.decimal(key);
                break;
              case "boolean":
                table.boolean(key);
                break;
              case "date":
                table.date(key);
                break;
              case "time":
                table.time(key);
                break;
              case "timestamp":
                table.timestamp(key).defaultTo(this.knex.fn.now());
                break;
              case "biginteger": 
                table.bigInteger(key);
                break;
              case "serial":
                table.increments(key);
                break;
              default: 
                throw new Error("wrong type");
            }
        });
      });
    else 
      return this.name + " table uje bor";
  }

  async insert(data, returning = "id") {
    return this.knex.insert(data, returning).into(this.name);
  }

  async update(id, data) {
    return this.knex(this.name).update(data, "id").where('id', id);
  }

  async delete(id) {
    return this.knex(this.name).where("id", id).del();
  }

  async getById(id) {
    return this.knex(this.name).where("id", id).select();
  }

  async getList() {
    return this.knex.select().from(this.name);
  }

}






// person.create({ 
//   id: "serial",
//   name: "string",
//   date_of_birth: "date",
//   address: "string",
//   country: "string",
//   email: "string"
// }).then()

module.exports = Model;


// .then(data => {
//  console.log("create", data);

//  return person.insert(forInsert)
// }).then(data => {
//  console.log("insert",data);
//  return person.update(1, {"date_of_birth": "1999-02-26"})
// }).then(data => {
//  console.log("update",data);
//  return person.delete(3);
// }).then(data => {
//  console.log("delete",data);
//  return person.getByCountry("Great Britain");
// }).then(data => {
//  console.log("getByCountry", data);
// })

// .catch(err => console.log(err))


// person.getList(); // ==> []
// person.getById(id); // {id:"serial",name: "string", date_of_birth: "date", address: "string",country: "string",email: "string"}
// person.update(1, { person }) // ==> id
// person.delete(id);
// person.batch([person,person]); // ==> {}
// person.getByCountry('Country_name');
// person.getByMinAge(18);