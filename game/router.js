const { Router } = require('express')
const Game = require('./model')
const auth = require('../auth/middleware')

const router = new Router()

router.get('/game', (req, res, next) => {
  Game.findAll()
      .then((games) => {
        return res.status(200).send(games)
      })
      .catch(next)
})

router.post('/game', (req, res, next) => {
  Game.create(req.body)
    .then(game => res.send(game))
    .catch(next)
})

router.put('/game/:id', (req, res, next) => {
  Game.findByPk(req.params.id)
    .then(game => {
      if (game) {
        return game.update(req.body)
        .then(game => res.status(200).json(game))
      } else {
        return res.status(404).end()
      }
    })
    .catch(next)
})


// Authentification front end
// superagent.get('local/game')
//   .set('authorization', `Bearer ${jwt}`)

module.exports = router