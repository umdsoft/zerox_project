const cron = require("node-cron");
const Act = require("../models/Acts");
const Contract = require("../models/Contracts");
const Notification = require("../models/Notifications");
const Rating = require('../models/Ratings')
const User = require('../models/Users')
const UserRating = require('../models/UserRating')

exports.cronJob = async () => {
    await cron.schedule('1 59 23 * * *', async () => {
        try {
            const ss = await Notification.query().where('type', 0)
            const dd = await Notification.query().where('type', 1)
            const dds = await Notification.query().where('type', 3)
            const zeroAct = await Act.query().where('status', 0)
            const ds = await Notification.query().where('type', 2) // const contracts = await knex.select('*').from('contracts').where('status',0).catch((err)=>{console.log(err)})
            zeroAct.forEach(async (item) => {
                await Act.query().where('id', item.id).update({ status: 2, reciver: null })
            })
            ss.forEach(async (item) => {
                await Notification.query().insert({
                    type: 21, // Tizim tomonidan o`chirilgan sms
                    contract: item.contract,
                    debitor: item.debitor,
                    creditor: item.creditor,
                    reciver: item.creditor,
                    time: new Date()
                })
                await Notification.query().insert({
                    type: 21, // Tizim tomonidan o`chirilgan sms
                    contract: item.contract,
                    debitor: item.debitor,
                    creditor: item.creditor,
                    reciver: item.debitor,
                    time: new Date()
                })
                await Notification.query().where('id', item.id).delete()
                await Contract.query().where('id', item.contract).update({ status: 4 })

            })

            dd.forEach(async (item) => {
                await Notification.query().insert({
                    type: 22, // Tizim tomonidan o`chirilgan ACT
                    contract: item.contract,
                    debitor: item.debitor,
                    creditor: item.creditor,
                    act: item.act,
                    reciver: item.reciver == item.creditor ? item.debitor : item.creditor,
                    time: new Date()
                })
                await Notification.query().insert({
                    type: 22, // Tizim tomonidan o`chirilgan ACT
                    contract: item.contract,
                    debitor: item.debitor,
                    creditor: item.creditor,
                    act: item.act,
                    reciver: item.reciver == item.creditor ? item.creditor : item.debitor,
                    time: new Date()
                })
                await Act.query().where('id', item.act).update({ status: 2, reciver: null })
                await Notification.query().where('id', item.id).delete()
            })
            dds.forEach(async (item) => {
                await Notification.query().insert({
                    type: 27, // Tizim tomonidan o`chirilgan ACT
                    contract: item.contract,
                    debitor: item.debitor,
                    creditor: item.creditor,
                    act: item.act,
                    reciver: item.reciver == item.creditor ? item.debitor : item.creditor,
                    time: new Date()
                })
                await Notification.query().insert({
                    type: 27, // Tizim tomonidan o`chirilgan ACT
                    contract: item.contract,
                    debitor: item.debitor,
                    creditor: item.creditor,
                    act: item.act,
                    reciver: item.reciver == item.creditor ? item.creditor : item.debitor,
                    time: new Date()
                })
                await Act.query().where('id', item.act).update({ status: 2, reciver: null })
                await Notification.query().where('id', item.id).delete()
            })

            ds.forEach(async (item) => {
                await Notification.query().insert({
                    type: 22, // Tizim tomonidan o`chirilgan ACT
                    contract: item.contract,
                    debitor: item.debitor,
                    creditor: item.creditor,
                    act: item.act,
                    reciver: item.reciver == item.creditor ? item.debitor : item.creditor,
                    time: new Date()
                })
                await Notification.query().insert({
                    type: 22, // Tizim tomonidan o`chirilgan ACT
                    contract: item.contract,
                    debitor: item.debitor,
                    creditor: item.creditor,
                    act: item.act,
                    reciver: item.reciver == item.creditor ? item.creditor : item.debitor,
                    time: new Date()
                })
                await Act.query().where('id', item.act).update({ status: 2, reciver: null })
                await Notification.query().where('id', item.id).delete()
            })

            console.log('ok')
        } catch (e) {
            console.log(e)
        }
    })

}
exports.delNoti = async () => {
    // await cron.schedule('* * * * * *', async () => {
    //     const dd = await Notification.query().where('type', 19)
    //     dd.forEach(async (item) => {
    //         if (parseInt(item.timer) < new Date().getTime()) {
    //             await Notification.query().deleteById(item.id)
    //         }
    //     })

    // })
}

exports.minus_rating = async () => {
    await cron.schedule('1 05 00 * * *', async () => {
        try {
            const knex = await Contract.knex()
            const ratingKnex = await Rating.knex()
            const old_contract = await knex.raw(`SELECT c.id,
            c.debitor,
         c.creditor,
          c.number,
          a.end_date,
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
   WHERE c.status = 1
     AND a.status = 1
     AND a.end_date = CURRENT_DATE() - INTERVAL 1 DAY;`)
            console.log(old_contract[0])
            // Har bir shartnoma bo`yicha olib chiqish
            old_contract[0].forEach(async (item) => {
                let count;
                let status_type;
                let type;
                const fiveDay = await knex.raw(`SELECT * FROM contracts c WHERE c.id = ${item.id} AND c.status = 1 AND DATE_ADD(c.created_at, INTERVAL 5 DAY) < NOW();`); // 5 kun orasindagi shartnoma
                const rating31Days = await ratingKnex.raw(`SELECT * FROM ratings r WHERE r.user_id = ${item.creditor} AND r.user_deb = ${item.debitor} AND DATE_SUB(NOW(), interval 31 day);`); // 31 kalendar ish kunida 1 odam bilan 3 shartnoma
                const candidate = await User.query().findById(item.creditor);
                let condidateRating = candidate.rating;
                if (fiveDay[0].length == 0) {
                    return console.log("Bu shartnoma 5 kun oraliqda");
                } else {
                    if (rating31Days[0].length < 3) {
                        count = condidateRating - (100 - condidateRating) * 0.2;
                        status_type = 2;
                        if (count <= 0) {
                            count = 0;
                        }
                        type = 2
                        await Rating.query().insert({
                            user_id: item.creditor,
                            user_deb: item.debitor,
                            contract_id: item.id,
                            count: count,
                            type: type,
                            stype: status_type,
                        });
                        await User.query().findById(item.creditor).update({
                            rating: count,
                            rating_type: type,
                        });
                        await UserRating.query().insert({
                            contract_id: item.id,
                            contract_number: item.number,
                            user: item.creditor,
                            rating_count: count,
                            old_rating: condidateRating,
                            rating_type: type
                        })
                    } else { return console.log('rating false') }
                }

            })

        } catch (e) {
            console.log(e)
        }
    })
}
