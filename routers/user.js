const router = require('express').Router()
const { userController } = require("../controllers/user")

// Login
router.get("/login", async(req,res) => {
  userController.login(req,res)
})

// New user 
router.post("/newUser", async(req,res) => {
  userController.newUser(req,res)
})

module.exports = router