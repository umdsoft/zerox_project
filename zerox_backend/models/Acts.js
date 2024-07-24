const { Model } = require("objection")
const knex = require("../setting/mDb")

Model.knex(knex)

class Act extends Model {
	static get tableName() {
		return "acts"
	}

	// properties
	static get jsonSchema() {
		

				// 	  status: { type: Number, enum: [0, 1, 2], default: 0 },
				// 	  // 0-Yangi dalolatnoma, 1-ikki taraflama tasdiqlangan dalolatnoma, 2-rad qilingan dalolatnoma
				// 	  type: { type: Number, enum: [0, 1, 2, 3, 4, 5, 6, 7], default: 0 },
				// 	  // 0-Qarz shartnomasi dalolatnomasi,
				// 	  // 1-Qarzni qisman qaytarish bo`yicha dalolatnoma,
				// 	  // 2-qarzni to`liq qaytarish bo`yicha dalolatnoma
				// 	  // 3- qarz muddatini uzaytirish bo`yicha dalolatnoma,
				// 	  // 4-qarzdan to`liq vos kechish bo`yicha dalolatnoma
				// 	  // 5-qarzdan qisman vos kechish bo'yicha dalolatnoma,
				// 	  // 6- qarzni uzaytirish ( debitor )
				// 	  // 7-qarzmni qaytarishni talab qilish

		}
}


module.exports = Act
