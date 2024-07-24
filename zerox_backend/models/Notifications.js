const { Model } = require("objection")
const knex = require("../setting/mDb")

Model.knex(knex)

class Notification extends Model {
	static get tableName() {
		return "notifications"
	}

	static get jsonSchema() {
	}
}

module.exports = Notification
