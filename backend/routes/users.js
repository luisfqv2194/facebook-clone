const express = require('express')
const {
  register,
  activateAccount,
  login,
  auth,
} = require('../controllers/users')
const { authUser } = require('../middlewares/auth')
const router = express.Router()

router.post('/register', register)
router.patch('/activate/:token', activateAccount)
router.post('/login', login)

module.exports = router
