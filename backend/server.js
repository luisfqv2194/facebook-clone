const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const { readdirSync } = require('fs')

dotenv.config()

const PORT = process.env.PORT || 8000

const app = express()

app.use(cors())

readdirSync('./routes').map((file) => {
  app.use('/api/', require(`./routes/${file}`))
})

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}..`)
})
