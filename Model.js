const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'postgres',
    database : 'demo'
  }
});

const forInsert = require('./data.json')

class Model {
	constructor(name) {
		this.name = name;
	}

	async create(obj) {
		console.log("ishladimi")
		return knex.schema.withSchema('public').createTable(this.name, function (table) {
			Object.keys(obj).forEach(key => {
				console.log("ishladimi")
				  switch(obj[key]) {
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
				  		table.timestamp(key).defaultTo(knex.fn.now());
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

	}

	async insert(data, returning = "id") {
		return knex.insert(data, returning).into(this.name);
	}

	async update(id, data) {
		return knex(this.name).update(data, "id").where('id', id);
	}

	async delete(id) {
		return knex(this.name).where("id", id);
	}

	async getById(id) {
		return knex(this.name).where("id", id).select();
	}

	async getList() {
		return knex.select().from(this.name);
	}

}

class Person extends Model {
	async getByCountry(country) {
		return knex(this.name).where("country", country).select();
	}

	async getByMinAge() {

	}
}


const person = new Person("person");

person.create({ 
  id: "serial",
  name: "string",
  date_of_birth: "date",
  address: "string",
  country: "string",
  email: "string"
}).then(data => {
	console.log("create", data);

	return person.insert(forInsert)
}).then(data => {
	console.log("insert",data);
	return person.update(1, {"date_of_birth": "1999-02-26"})
}).then(data => {
	console.log("update",data);
	return person.delete(3);
}).then(data => {
	console.log("delete",data);
	return person.getByCountry("Great Britain");
}).then(data => {
	console.log("getByCountry", data);
})

.catch(err => console.log(err))


// person.getList(); // ==> []
// person.getById(id); // {id:"serial",name: "string", date_of_birth: "date", address: "string",country: "string",email: "string"}
// person.update(1, { person }) // ==> id
// person.delete(id);
// person.batch([person,person]); // ==> {}
// person.getByCountry('Country_name');
// person.getByMinAge(18);