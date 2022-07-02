const router = require('express').Router()
const { userController } = require("../controllers/user")

router.post("/listHeathCenters", async(req,res) => {
  userController.addNotification(req, res);
})

router.post("/notification", async(req,res) => {
  userController.addNotification(req, res);
})

// Login
router.get("/login", async(req,res) => {
  userController.login(req,res)
})

// New user 
router.post("/newUser", async(req,res) => {
  userController.newUser(req,res)
})

// send email to user
router.post("/sendCode", async(req,res) => {
  userController.sendCodeVerificationToUser(req,res)
})

// validate verification code
router.get("/validateVerificationCode/:code", async(req,res) => {
  userController.validateVerificationCode(req,res)
})

router.get("/getNotifications/:userId", async(req,res) => {
  userController.getNotifications(req,res)
})

module.exports = router
