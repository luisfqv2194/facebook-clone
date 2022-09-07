const User = require('../models/User')

exports.validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2, 12})?$/)
}

exports.validateLength = (text, min, max) => {
  return text.length > max || text.length < min ? false : true
}

exports.validateUsername = async (username) => {
  let usernameNotAvailable = true
  do {
    usernameNotAvailable = await User.findOne({ username })
    if (usernameNotAvailable) {
      username += (+new Date() * Math.random()).toString().substring(0, 1)
    } else {
      usernameNotAvailable = false
    }
  } while (usernameNotAvailable)
  return username
}
