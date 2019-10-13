const { Router } = require('express')
const Room = require('./model')
const Player = require('../player/model')
const auth = require('../auth/middleware')
const {toData} = require('../auth/jwt')
const Game = require('../game/model')

const router = new Router()

router.get('/room', (req, res, next) => {
  Room.findAll()
      .then((rooms) => {
        return res.status(200).send(rooms)
      })
      .catch(next)
})

router.get('/room/:id', (req, res, next) => {
  Room.findByPk(req.params.id)
    .then(result => {
      if (result) {
        res.status(200).send(result)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
})

router.post('/room', (req, res, next) => {
  Room.create({
    name: req.body.name,
    status: 'Empty',
    player1_id: null,
    player2_id: null,
    category_id: 0
  })
    .then(room => res.send(room))
    .catch(next)
})


router.put('/room/:id', auth, (req, res, next) => {
  const auth = req.headers.authorization && req.headers.authorization.split(' ')
  // console.log("user id", req.headers.authorization)
  // console.log("to Data", toData(auth[1]))
  if (auth && auth[0] === 'Bearer' && auth[1]) {
    const dataFromToData = toData(auth[1])
    // console.log("data from toData", dataFromToData)
    const pId = dataFromToData.playerId;
    console.log('New id var:', pId);

    Room.findByPk(req.params.id)
    .then(foundRoom => {
      console.log("what is room", foundRoom.dataValues)
      // console.log("Room id from React", req.params.id)
      if (foundRoom.player1_id === null) {
        // store player1 ID
        foundRoom.update({
          player1_id: pId,
          status: "Waiting",
        })
      } else {
        // store player2 ID
        foundRoom.update({
          player2_id: pId,
          status: "Playing"
        })  
      }
    })
    .catch(next)
  }
})

Room.belongsTo(Game)
Game.hasMany(Room)

module.exports = router