const router = require('express').Router();

//API Routes 
router.use('/userNums', require('./userNums'))

//Handles 404 Errors
router.use((req, res, next) => {
  const err = new Error('Not Found.')
  err.status = 404; 
  next(err)
})

module.exports = router;