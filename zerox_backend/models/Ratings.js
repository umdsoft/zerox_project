const { Model } = require("objection")
const knex = require("../setting/mDb")

Model.knex(knex)

class Rating extends Model {
	static get tableName() {
		return "ratings"
	}

	// properties
	static get jsonSchema() {
		
		}
}


module.exports = Rating
