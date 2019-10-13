const Sequelize = require('sequelize')
const db = require('../db')

const Questions = db.define('questions', {
  question: {
    type: Sequelize.STRING,
    allowNull: false
  },
  right_answer: {
    type: Sequelize.STRING,
    allowNull: false
  },
  wrong_answer1: {
    type: Sequelize.STRING,
    allowNull: false
  },
  wrong_answer2: {
    type: Sequelize.STRING,
    allowNull: false
  },
  wrong_answer3: {
    type: Sequelize.STRING,
    allowNull: true
  },
}, {
  timestamps: false,
  tableName: 'questions'
})

module.exports = Questions