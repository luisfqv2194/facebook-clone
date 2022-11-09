const express = require('express')
const {
  register,
  activateAccount,
  login,
  auth,
  sendVerification,
  findUser,
  sendResetPasswordCode,
  validateResetCode,
  changePassword,
  getProfile,
} = require('../controllers/users')
const { authUser } = require('../middlewares/auth')
const router = express.Router()

router.post('/register', register)
router.patch('/activate', authUser, activateAccount)
router.post('/login', login)
router.post('/sendVerification', authUser, sendVerification)
router.post('/findUser', findUser)
router.post('/sendResetPasswordCode', sendResetPasswordCode)
router.post('/validateResetCode', validateResetCode)
router.post('/changePassword', changePassword)
router.get('/getProfile/:username', getProfile)

module.exports = router
