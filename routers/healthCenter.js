const router = require('express').Router()
const { healthCenterController } = require('../controllers/healthCenter')

router.get("/listMedicine/:type", async(req,res) => {
  healthCenterController.listMedicine(req, res);
})

// add a medicine in a health center 
router.post("/addMedicine", async(req,res) => {
  healthCenterController.addMedicine(req,res)
})

// get a health center 
router.get("/:id", async(req,res) => {
  healthCenterController.getHealthCenter(req,res)
})

module.exports = router
