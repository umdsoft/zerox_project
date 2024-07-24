const { Model } = require("objection")
const knex = require("../setting/mDb")

Model.knex(knex)

class Currency extends Model {
	static get tableName() {
		return "currency"
	}
	// properties
	static get jsonSchema() {
		
		}
}


module.exports = Currency
