const Sequelize = require('sequelize')
const db = require('../db')
const Player = require('../player/model')

const Room = db.define('room', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category_id: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false
  },
  player1_id: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  player2_id: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
}, {
  timestamps: false,
  tableName: 'room'
})

Player.belongsTo(Room)
Room.hasMany(Player)

module.exports = Room