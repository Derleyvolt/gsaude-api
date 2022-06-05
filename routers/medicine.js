const router = require('express').Router()
const { medicineController } = require("../controllers/medicine")

// get medicine
router.get("/:name", async(req,res) => {
  medicineController.getMedicine(req,res)
})

module.exports = router