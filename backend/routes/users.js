const express = require('express')
const { register, activateAccount, login } = require('../controllers/users')
const router = express.Router()

router.post('/register', register)
router.patch('/activate/:token', activateAccount)
router.post('/login', login)

module.exports = router
