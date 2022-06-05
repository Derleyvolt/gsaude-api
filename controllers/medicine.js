const medicineModel = require("../models/medicine")

// search medicine
const getMedicine = async (req,res) => {
  try {
    const select = "name latitude longitude medicines"
    let medicine = await medicineModel.findOne({ name: req.params.name })
      .populate({path:"inventory", select})

    // medicine.invetory.medicines = medicine.filter((element) => element.invetory.medicines.medicine == medicine._id)
    res.status(200).json(medicine)

  }catch(err) {
    res.status(500).json(err)
  }
}

const medicineController = {
  getMedicine,
}

module.exports = { medicineController }