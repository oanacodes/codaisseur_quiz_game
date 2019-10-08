const { Router } = require('express')
const Player = require('./model')
const auth = require('../auth/middleware')

const router = new Router()

router.get('/players', (req, res, next) => {
  Player.findAll()
      .then((players) => {
        return res.status(200).send(players)
      })
      .catch(next)
})

module.exports = router