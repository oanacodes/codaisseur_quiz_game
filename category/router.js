const { Router } = require('express')
const Category = require('./model')
const auth = require('../auth/middleware')

const router = new Router()

router.get('/categories', (req, res, next) => {
  Category.findAll()
      .then((categories) => {
        return res.status(200).send(categories)
      })
      .catch(next)
})

router.post('/categories', (req, res, next) => {
  Category.create(req.body)
    .then(category => res.send(category))
    .catch(next)
})

module.exports = router