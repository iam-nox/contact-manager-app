const express = require('express')
const dotenv = require('dotenv').config()
const connectDb = require('./startup/db')

connectDb()
const app = express()

app.use(express.json())
app.use('/api/contacts', require('./routes/contacts'))
app.use('/api/users', require('./routes/users'))

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`contact manager listening on port ${port}`)
})