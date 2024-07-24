const { Model } = require("objection")
const knex = require("../setting/mDb")

Model.knex(knex)

class UserArchive extends Model {
    static get tableName() {
        return "user_archive"
    }

    // properties
    static get jsonSchema() {

    }
}


module.exports = UserArchive
