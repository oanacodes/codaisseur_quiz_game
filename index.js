const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db')


const app = express()
const port = process.env.PORT || 4030

app.listen(port, () => console.log(`I'm listening on ${port}`))

const corsMiddleware = cors()
app.use(corsMiddleware)

const parserMiddleware = bodyParser.json()
app.use(parserMiddleware)