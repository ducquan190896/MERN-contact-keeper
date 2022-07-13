const express = require('express')
const { register, signin } = require('../controller/user')
const router = express.Router()


router.route('/').post(register)
router.route('/signin').post(signin)


module.exports = router