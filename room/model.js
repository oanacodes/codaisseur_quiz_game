const Sequelize = require('sequelize')
const db = require('../db')
const Player = require('../player/model')

const Room = db.define('room', {
  category_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false
  },
  player1_id: {
    type: Sequelize.STRING,
    allowNull: false
  },
  player2_id: {
    type: Sequelize.STRING,
    allowNull: false
  },
}, {
  timestamps: false,
  tableName: 'room'
})

// Player.belongsTo(Room)
// Room.hasMany(Player)

module.exports = Room