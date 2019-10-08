const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db')
const PlayerRouter = require('./player/router')
const authRouter = require('./auth/router')
// const authMiddleware = require('./auth/middleware')
const categoryRouter = require('./category/router')
const gameRouter = require('./game/router')
const roomRouter = require('./room/router')
const reactRouter = require('./react/router')

const app = express()
const port = process.env.PORT || 4050

app.listen(port, () => console.log(`I'm listening on ${port}`))

const corsMiddleware = cors()
app.use(corsMiddleware)

const parserMiddleware = bodyParser.json()
app.use(parserMiddleware)

app.use(PlayerRouter)
app.use(authRouter)
// app.use(authMiddleware)
app.use(categoryRouter)
app.use(gameRouter)
app.use(roomRouter)
app.use(reactRouter)