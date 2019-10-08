const { Router } = require('express')
const Lobby = require('./model')
const auth = require('../auth/middleware')

const router = new Router()

router.get('/lobby', (req, res, next) => {
  Lobby.findAll()
      .then((lobbies) => {
        return res.status(200).send(lobbies)
      })
      .catch(next)
})

router.post('/lobby', (req, res, next) => {
  Lobby.create(req.body)
    .then(lobby => res.send(lobby))
    .catch(next)
})

module.exports = router