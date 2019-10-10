const Sequelize = require('sequelize')
const db = require('../db')

const Game = db.define('game', {
  player1_id: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  player2_id: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  player1_questionId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  player2_questionId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  player1_score: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  player2_score: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
}, {
  timestamps: false,
  tableName: 'game'
})


module.exports = Game