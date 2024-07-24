const { Model } = require("objection")
const knex = require("../setting/mDb")

Model.knex(knex)

class PaymeTransaction extends Model {
    static get tableName() {
        return "payme_transaction"
    }

    // properties
    static get jsonSchema() {

    }
}


module.exports = PaymeTransaction
