const { Model } = require("objection")
const knex = require("../setting/mDb")

Model.knex(knex)

class News extends Model {
    static get tableName() {
        return "news"
    }

    // properties
    static get jsonSchema() {

    }
}


module.exports = News
