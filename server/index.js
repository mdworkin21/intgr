const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const morgan = require('morgan')
const app = express()
// const db = require('./db/database')


//Logging MiddleWare
app.use(morgan('dev'))

//BodyParsing MiddleWare
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


//Static Middleware
app.use(express.static(path.join(__dirname, '..', '/client/public')))

//Api Routes
app.use('/api', require('./api'))

// Redirects to homepage when no API reqs match
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '/client/public/'))
})

//Handles 500 Errs
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal Server Err. Whoops!')
})


module.exports = app