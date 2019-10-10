const { Router } = require('express')
const Player = require('../player/model')
const {toJWT} = require('../auth/jwt')
const bcrypt = require('bcrypt')
const auth = require('./middleware')

const router = new Router()

// created signup endpoing
router.post('/signup', (req, res, next) => {
  const player = {
    name: req.body.name,
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
      Player.findOne({
          where:{
              email: req.body.email
          }
      })
      .then(player => {
          if(!player){
              res.status(400).send({
                  message: 'User with that email does not exist'
              })
          }
          else if(bcrypt.compareSync(password, player.password)){
              res.send({
                  jwt: toJWT({playerId: player.id})
                  // playerId: player.id,
                  // name: player.name
              })
          }
          else{
              res.status(400).send({
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

router.get('/secret-endpoint', auth, (req, res) => {
  res.send({
    message: `Thanks for visiting the secret endpoint ${req.user.email}.`,
  })
})

module.exports = router