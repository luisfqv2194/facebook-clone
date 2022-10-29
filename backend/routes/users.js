const express = require('express')
const {
  register,
  activateAccount,
  login,
  auth,
  sendVerification,
} = require('../controllers/users')
const { authUser } = require('../middlewares/auth')
const router = express.Router()

router.post('/register', register)
router.patch('/activate', authUser, activateAccount)
router.post('/login', login)
router.post('/sendVerification', authUser, sendVerification)

module.exports = router
