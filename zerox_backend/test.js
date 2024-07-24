const Rating = require('./models/Ratings')
const User = require('./models/Users')
const Contract = require('./models/Contracts')
async function rating(user, contract){
  let type;
  let count;
  let stype;
  // console.log(user)
  const rr = await Rating.query().where('user_id', user).orderBy('id', 'desc').limit(3)
  // console.log(rr)
  const ss = await rr.every((item) => item.stype == 1)
  const dd = await rr.every((item) => item.stype == 0)
  // console.log(ss)
  const knex = await Contract.knex();
  const rat = await knex.raw(`select * from ratings where user_id = ${user} AND YEAR(created_at) = YEAR(CURDATE()) AND MONTH(created_at) = MONTH(CURDATE())`)
  const contracts = await knex.raw(`
		SELECT c.id,
       a.residual_amount,
       c.amount,
       c.number,
       a.inc,
       a.end_date,
       c.currency,
       c.created_at
FROM contracts c
LEFT JOIN
  (SELECT *
   FROM acts
   WHERE id IN
       (SELECT MAX(id)
        FROM acts a
        WHERE a.status = 1
        GROUP BY contract_id) ) a ON a.contract_id = c.id
LEFT JOIN users u1 ON u1.id = c.creditor
LEFT JOIN users u2 ON u2.id = c.debitor
WHERE c.id = ${contract}
  AND c.status = 1
  AND a.status = 1
  AND a.end_date < CURRENT_DATE();`
  );
  const five = await knex.raw(`
  SELECT *
  FROM contracts c
  WHERE c.status = 1 AND c.id = ${contract} AND c.created_at BETWEEN c.created_at AND c.created_at + interval 5 DAY;;
  `)
  const candidate = await User.query().findById(99);
  let x = candidate.rating
  // console.log(x)
  // type = 1 1 oshgan
  // type = 2 2 oshgan
  // type = 3 1 kamaygan
  // type = 4 2 kamaygan
  // console.log(rat[0])
  // if (rat[0].length > 3) {
  //   return 0
  // } else {
  //   // console.log('11')
  if (five[0].length > 0) {
    console.log('hhse')
    return 0;
  }

//   if()
  
console.log(contracts[0].end_date)  

//   await Rating.query().insert({
//     user_id: user,
//     contract_id: contract,
//     count: count,
//     type: type,
//     stype: stype
//   })
//   await User.query().findById(99).update({
//     rating: count,
//     rating_type: type
//   })
//   // }

}

rating(99,89)