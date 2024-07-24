const { Model } = require("objection")
const knex = require("../setting/mDb")

Model.knex(knex)

class Journal extends Model {
    static get tableName() {
        return "journal"
    }

    // properties
    static get jsonSchema() {

    }
}


module.exports = Journal
