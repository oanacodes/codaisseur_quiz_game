const Sequelize = require('sequelize')
const db = require('../db')

const Game = db.define('game', {
  room_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  category_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  question_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  player_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  score: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
}, {
  timestamps: false,
  tableName: 'game'
})

module.exports = Game