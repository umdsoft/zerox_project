const News = require('../models/News')
exports.create = async (req, res) => {
    try {
        await News.query().insert(req.body)
        return res.status(201).json({ success: true })
    } catch (e) {
        return res.status(400).json({ success: false, e })
    }

}
exports.getAdminAll = async (req, res) => {
    try {
        const limit = req.query.limit || 10;
        const skip = (req.query.page - 1) * limit;
        const knex = await News.knex();
        const data = await knex.raw(`SELECT * FROM news n ORDER BY n.id DESC LIMIT ${limit} OFFSET ${skip}`)
        const cnt = await knex.raw(`SELECT * FROM news n ORDER BY n.id DESC`)

        return res.status(200).json({ success: true, data: data[0], count: cnt[0].length })
    } catch (e) {
        return res.status(400).json({ success: false, e })
    }

}
exports.get10News = async (req, res) => {
    try {
        const knex = await News.knex();
        const data = await knex.raw(`SELECT * FROM news n WHERE n.lang = ${req.query.lang} ORDER BY n.id DESC LIMIT 10`)
        return res.status(200).json({ success: true, data: data[0] })
    } catch (e) {
        return res.status(400).json({ success: false, e })
    }

}
exports.edit = async (req, res) => {
    try {
        await News.query().findById(req.params.id).update(req.body)
        return res.status(200).json({ success: true })
    } catch (e) {
        return res.status(400).json({ success: false, e })
    }

}
exports.rm = async (req, res) => {
    try {
        await News.query().deleteById(req.params.id)
        return res.status(200).json({ success: true })
    }
    catch (e) {
        return res.status(400).json({ success: false, e })
    }
}