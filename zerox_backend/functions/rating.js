const Rating = require("../models/Ratings");
const User = require("../models/Users");
const Contract = require("../models/Contracts");
const UserRating = require('../models/UserRating')
exports.rating = async (user, contract, debitor) => {
  console.log("rating");
  try {
    const candidate = await User.query().findById(user);
    let condidateRating = candidate.rating;
    let count;
    let status_type;
    let type;
    const knex = await Contract.knex();
    const ratingKnex = await Rating.knex(); 
    const fiveDay = await knex.raw(
      `SELECT * FROM contracts c WHERE c.id = ${contract} AND c.status = 1 AND DATE_ADD(c.created_at, INTERVAL 5 DAY) < NOW();`
    );
    const rating31Days = await ratingKnex.raw(
      `SELECT * FROM ratings r WHERE r.user_id = ${user} AND r.user_deb = ${debitor} AND DATE_SUB(NOW(), interval 31 day);`
    );
    if (fiveDay[0].length == 0) {
      return console.log("Bu shartnoma 5 kun oraliqda");
    } else {
      if (rating31Days[0].length < 3) {
        count = condidateRating + (100 - condidateRating) * 0.1;
        status_type = 1;
        if (count >= 100) {
          count = 100;
        }
        type = 1;
        await Rating.query().insert({
          user_id: user,
          user_deb: debitor,
          contract_id: contract,
          count: count,
          type: type,
          stype: status_type,
        });
        await User.query().findById(user).update({
          rating: count,
          rating_type: type,
        });
        await UserRating.query().insert({
          contract_id: item.id,
          contract_number: item.number,
          user:item.creditor,
          rating_count: count,
          old_rating: condidateRating,
          rating_type: type
      })
      } else { return console.log('rating false') }
    }
  } catch (e) {
    console.log(e);
  }
};
