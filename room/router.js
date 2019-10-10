const { Router } = require('express')
const Room = require('./model')
const Player = require('../player/model')
const auth = require('../auth/middleware')
const {toData} = require('../auth/jwt')
const jwt = require('../auth/jwt')

const router = new Router()

router.get('/room', (req, res, next) => {
  Room.findAll()
      .then((rooms) => {
        return res.status(200).send(rooms)
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
    function getPlayerId (data) {
      const {playerId} = dataFromToData;
      console.log("PlayerId is", playerId)
      return playerId
    }
    getPlayerId(dataFromToData)

    Room.findByPk(req.params.id)
    .then(foundRoom => {
      // console.log("what is room", foundRoom.dataValues)
      // console.log("Room id from React", req.params.id)
      if (foundRoom.player1_id === null) {
        // store player1 ID
        foundRoom.update({
          player1_id: getPlayerId(dataFromToData),
          status: "Waiting",
        })
      } else {
        // store player2 ID
        foundRoom.update({
          player2_id: 888,
          status: "Playing"
        })  
      console.log("got a player ID", foundRoom.player1_id)
      }
      console.log("got a player ID", "hello2")
    })
    .catch(next)
  }
})



// create const with toData, destructure and get playerID 
// get player1 and player 2 ids update automatically

// router.post('/playerjoin', (req, res, next) => {
//   Room.FindByPk
// })

module.exports = router