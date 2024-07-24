const { Model } = require("objection")
const knex = require("../setting/mDb")

Model.knex(knex)

class IsPay extends Model {
    static get tableName() {
        return "is_pay"
    }

    // properties
    static get jsonSchema() {

    }
}


module.exports = IsPay
