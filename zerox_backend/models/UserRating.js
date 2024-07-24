const { Model } = require("objection")
const knex = require("../setting/mDb")

Model.knex(knex)

class UserRating extends Model {
	static get tableName() {
		return "user_rating"
	}

	// properties
	static get jsonSchema() {
		
		}
}


module.exports = UserRating
