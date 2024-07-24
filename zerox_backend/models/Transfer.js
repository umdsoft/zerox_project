const { Model } = require("objection")
const knex = require("../setting/mDb")

Model.knex(knex)

class Transfer extends Model {
	static get tableName() {
		return "report"
	}

	static get jsonSchema() {

	}
}

module.exports = Transfer
