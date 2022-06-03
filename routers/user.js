const router = require('express').Router()
const { userController } = require("../controllers/user")

// New user 
router.post("/newUser", async(req,res) => {
  userController.newUser(req,res)
})

module.exports = router