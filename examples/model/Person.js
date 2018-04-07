const Model = require("./Model");

class Person extends Model {
  async getByCountry(country) {
    return this.knex(this.name).where("country", country).select();
  }

  async getByMinAge() {

  }
}


module.exports = (db) => {
  return new Person("person", db, { 
    id: "serial",
    name: "string",
    date_of_birth: "date",
    address: "string",
    country: "string",
    email: "string"
  });
} 