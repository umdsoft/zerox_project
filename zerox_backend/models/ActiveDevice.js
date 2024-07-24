const { Model } = require("objection")
const knex = require("../setting/mDb")

Model.knex(knex)

class ActiveDevice extends Model {
	static get tableName() {
		return "active_device"
	}

	static get jsonSchema() {

	}
}

module.exports = ActiveDevice
