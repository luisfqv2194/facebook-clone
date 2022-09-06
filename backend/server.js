const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const { readdirSync } = require('fs')

dotenv.config()

const PORT = process.env.PORT || 8000

const app = express()
app.use(express.json())
app.use(cors())

readdirSync('./routes').map((file) => {
  app.use('/api/', require(`./routes/${file}`))
})

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log('Database Connected'))
  .catch(() => console.log('Eror connecting to DB', err))

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}..`)
})
