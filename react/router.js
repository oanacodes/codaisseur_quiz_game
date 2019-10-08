const { Router } = require('express')
const React = require('./model')
const auth = require('../auth/middleware')

const router = new Router()

router.get('/react', (req, res, next) => {
  React.findAll()
      .then((react) => {
        return res.status(200).send(react)
      })
      .catch(next)
})

router.post('/react', (req, res, next) => {
  React.create(req.body)
    .then(react=> res.send(react))
    .catch(next)
})

module.exports = router