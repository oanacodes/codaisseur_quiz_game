const { Router } = require('express')
const Player = require('./model')
const bcrypt = require('bcrypt')

const router = new Router()

// created signup endpoing
router.post('/signup', (req, res, next) => {
  const player = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  }

  Player
    .create(player) 
    .then(player => res.status(200).send(player))
    .catch(next)
})

// created login endpoint
router.post('/login', (req,res) => {
  const email = req.body.email;
  const password = req.body.password
  if(!email || !password){
      res.status(400).send({
          message: 'Please supply a vaid email and password'
      })
  }
  else{
      User.findOne({
          where:{
              email: req.body.email
          }
      })
      .then(user => {
          if(!user){
              res.status(400).send({
                  message: 'User with that email dosenot exist'
              })
          }
          else if(bcrypt.compareSync(password, user.password)){
              res.send({
                  jwt: toJWT({userId: user.id})
              })
          }
          else{
              res.statsu(400).send({
                  message: 'Password was incorrect'
              })
          }
      })
      .catch(err => {
          console.error(err)
          res.status(500).send({
              message: 'Something went wrong'
          })
      })
  }
})
// add back auth
router.get('/secret-endpoint', (req, res) => {
  res.send({
      message: "Thanks for visiting the secret endpoint ${req.user.email}"
  })
})

module.exports = router