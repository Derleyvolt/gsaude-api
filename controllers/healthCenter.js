const healthCenterModel = require('../models/healthCenter')
const medicineModel = require('../models/medicine')

// add medicine in a health center
const addMedicine = async(req,res) => {
  try {
    await healthCenterModel.updateOne(
      { '_id': req.body.healthCenterId },
      {
        '$push': {
          'medicines': {
            medicine: req.body.medicine,
            amountAvailable: req.body.amountAvailable,
            situation: "available"
          }
        }
      }
    )

    await medicineModel.updateOne(
      { '_id': req.body.medicine},
      {
        '$push': {
          'inventory': req.body.healthCenterId
        }
      }
    )

    res.status(200).json({ message: "ok" })
  }catch(err) {
    res.status(500).json(err)
  }
}

// get a health center
const getHealthCenter = async(req,res) => {
  try {
    const select = "_id name bula"
    const healthCenter =  await healthCenterModel.findOne({ _id: req.params.id })
      .populate({path:"medicines.medicine", select})

    res.status(200).json(healthCenter)
  }catch(err) {
    res.status(500).json(err)
  }
}

const healthCenterController = {
  addMedicine,
  getHealthCenter,
}

module.exports = { healthCenterController }