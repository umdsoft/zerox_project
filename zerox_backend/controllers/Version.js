const Version = require('../models/Version')
exports.create = async (req, res) => {
    try {
        await Version.query().insert(req.body)
        return res.status(201).json({ success: true })
    } catch (e) {
        return res.status(400).json({ success: false, e })
    }

}
exports.getAdminAll = async (req, res) => {
    try {
        const limit = req.query.limit || 10;
        const skip = (req.query.page - 1) * limit;
        const knex = await Version.knex();
        const data = await knex.raw(`SELECT * FROM version v ORDER BY v.id DESC LIMIT ${limit} OFFSET ${skip}`)
        const cnt = await knex.raw(`SELECT * FROM version v ORDER BY v.id DESC`)

        return res.status(200).json({ success: true, data: data[0], count: cnt[0].length })
    } catch (e) {
        return res.status(400).json({ success: false, e })
    }

}
exports.edit = async (req, res) => {
    try {
        await Version.query().findById(req.params.id).update(req.body)
        return res.status(200).json({ success: true })
    } catch (e) {
        return res.status(400).json({ success: false, e })
    }

}
exports.getBy = async (req, res) => {
    try {
        const dd = await Version.query().findOne('type',req.query.type)
        return res.status(200).json({ success: true,data:dd })
    } catch (e) {
        return res.status(400).json({ success: false, e })
    }

}
exports.rm = async (req, res) => {
    try {
        await Version.query().deleteById(req.params.id)
        return res.status(200).json({ success: true })
    }
    catch (e) {
        return res.status(400).json({ success: false, e })
    }
}