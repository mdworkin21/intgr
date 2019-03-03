const router = require('express').Router()



router.post('/runAnalysis', async (req, res, next) => {
  try{
    let randomNum = Math.floor(Math.random() * Math.floor(9))
    res.status(200).json(randomNum)
  }catch(err){
    next(err)
  }
})

module.exports = router