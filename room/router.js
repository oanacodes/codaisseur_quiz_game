const { Router } = require('express')
const Room = require('./model')
const auth = require('../auth/middleware')

const router = new Router()

router.get('/room', (req, res, next) => {
  Room.findAll()
      .then((rooms) => {
        return res.status(200).send(rooms)
      })
      .catch(next)
})

router.post('/room', (req, res, next) => {
  Room.create(req.body)
    .then(room => res.send(room))
    .catch(next)
})

module.exports = router