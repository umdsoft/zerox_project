const { Model } = require("objection")
const knex = require("../setting/mDb")

Model.knex(knex)

class ClickTransaction extends Model {
    static get tableName() {
        return "click_transaction"
    }

    // properties
    static get jsonSchema() {

    }
}


module.exports = ClickTransaction
