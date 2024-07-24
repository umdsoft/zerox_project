const { Model } = require("objection")
const knex = require("../setting/mDb")

Model.knex(knex)

class Version extends Model {
    static get tableName() {
        return "version"
    }

    // properties
    static get jsonSchema() {

    }
}


module.exports = Version
