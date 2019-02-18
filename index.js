const app = require('./server')
const PORT = process.env.PORT || 3000
// const {db} = require('./server/db/models')


//Syncs with DB and listens for connections on host and port
//Put in {force: true} (to db.sync()) to update heroku db
// db.sync()
//   .then(() => {
//     console.log('db synced.')
//     app.listen(PORT, () => {
//       console.log('Server Live on Port: ', PORT)
//     })
//   });

  app.listen(PORT, () => {
    console.log('Server Live on Port: ', PORT)
  })