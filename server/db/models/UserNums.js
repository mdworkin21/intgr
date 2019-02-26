const db = require('../database')
const Sequelize = require('sequelize')


const UserNum = db.define('userNums', {
  label: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
  },
  image: {
    type: Sequelize.TEXT
  }
})

module.exports = UserNum