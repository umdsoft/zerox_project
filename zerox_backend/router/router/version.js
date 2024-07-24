const express = require('express')
const router = express.Router()
const Version = require('../../controllers/Version')

router.post('/create',Version.create)
router.get('/for-admin',Version.getAdminAll)
router.put('/:id',Version.edit)
router.delete('/:id',Version.rm)
router.get('/get',Version.getBy)

module.exports = router