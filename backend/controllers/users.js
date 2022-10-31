const {
  validateEmail,
  validateLength,
  validateUsername,
} = require('../helpers/validation')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { generateToken, verifyToken } = require('../helpers/tokens')
const { sendVerificationEmail } = require('../helpers/mailer')
const { findOne } = require('../models/User')
exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      bYear,
      bMonth,
      bDay,
      gender,
      username,
    } = req.body

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: 'invalid email address',
      })
    }

    const check = await User.findOne({ email })
    if (check) {
      return res.status(400).json({
        message: 'This email is already in use',
      })
    }

    if (!validateLength(first_name, 3, 30)) {
      return res.status(400).json({
        message: 'First name must be between 3 and 30 characters',
      })
    }

    if (!validateLength(last_name, 3, 30)) {
      return res.status(400).json({
        message: 'Last name must be between 3 and 30 characters',
      })
    }

    if (!validateLength(password, 6, 40)) {
      return res.status(400).json({
        message: 'Password must be at least 6 characters ',
      })
    }

    const cryptedPassword = await bcrypt.hash(password, 12)

    let tempUsername = first_name + last_name

    let newUsername = await validateUsername(tempUsername)

    const user = await new User({
      first_name,
      last_name,
      email,
      password: cryptedPassword,
      bYear,
      bMonth,
      bDay,
      gender,
      username: newUsername,
    }).save()

    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      '30m'
    )

    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`
    sendVerificationEmail(user.email, user.first_name, url)

    const token = generateToken({ id: user._id.toString() }, '7d')
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: 'Register Success! Please activate your email',
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.activateAccount = async (req, res) => {
  try {
    const validUser = req.user.id
    const { token } = req.body
    const user = verifyToken(token)
    const userExists = await User.findById(user.id)

    if (validUser !== user.id) {
      return res.status(400).json({
        message: "You don't have the authorization to complete this operation.",
      })
    }
    if (userExists.verified) {
      return res
        .status(400)
        .json({ message: 'This email is already activated' })
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true })
      return res.status(200).json({ message: 'Account activated. Thank you!' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Email doesn't exist" })
    }

    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
      return res
        .status(400)
        .json({ message: 'The password you’ve entered is incorrect.' })
    }

    if (!user.verified) {
      return res.status(400).json({ message: 'Please verify your email.' })
    }

    const token = generateToken({ id: user._id.toString() }, '7d')
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.sendVerification = async (req, res) => {
  try {
    const id = req.user.id
    const user = await User.findById(id)
    if (user.verified === true) {
      return res.status(400).json({
        message: 'This account is already activated.',
      })
    }
    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      '30m'
    )
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`
    sendVerificationEmail(user.email, user.first_name, url)
    return res.status(200).json({
      message: 'Email verification link has been sent to your email.',
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.findUser = async (req, res) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email: email })
    if (!user) {
      return res.status(400).json({ message: "Account doesn't exist" })
    }
    return res.status(200).json({ email: user.email, picture: user.picture })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
