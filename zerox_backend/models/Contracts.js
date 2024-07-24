const { Model } = require("objection")
const knex = require("../setting/mDb")

Model.knex(knex)

class Contract extends Model {
	static get tableName() {
		return "contracts"
	}

	static get jsonSchema() {

	}
}

module.exports = Contract
