const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
}, {
  timestamps: false,
  tableName: 'categories'
})

module.exports = Category