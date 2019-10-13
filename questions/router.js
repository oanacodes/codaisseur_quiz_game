const { Router } = require('express')
const Questions = require('./model')
const auth = require('../auth/middleware')

const router = new Router()

router.get('/questions', (req, res, next) => {
  Questions.findAll()
      .then((question) => {
        return res.status(200).send(question)
      })
      .catch(next)
})

router.post('/questions', (req, res, next) => {
  Questions.create(req.body)
    .then(question=> res.send(question))
    .catch(next)
})

module.exports = router