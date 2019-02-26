const router = require('express').Router()
const UserNums = require('../db/models/UserNums')



router.post('/', async (req, res, next) => {
  try{
    let newDrawing = await UserNums.create({
      label: req.body.label,
      image: req.body.image
    })

    res.status(200).send(newDrawing)
  } catch(err) {
      next(err)
  }
})

module.exports = router