const express = require('express')
const router = express.Router()
const News = require('../../controllers/News.controller')

router.post('/create',News.create)
router.get('/for-admin',News.getAdminAll)
router.get('/get',News.get10News)
router.put('/:id',News.edit)
router.delete('/:id',News.rm)

module.exports = router