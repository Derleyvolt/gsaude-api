const medicineModel = require("../models/medicine")

// search medicine
const getMedicine = async (req,res) => {
  try {
    const select = "name latitude longitude medicines"
    let medicineInfo = await medicineModel.findOne({ name: req.params.name })
      .populate({path:"inventory", select})

    if(medicineInfo != null) {
      medicineInfo = medicineInfo.toObject()
      delete medicineInfo.updatedAt

      medicineInfo.inventory.forEach(element => {
        const arrayMedicines = element.medicines.filter(item => item.medicine.equals(medicineInfo._id))
        element.medicine = arrayMedicines[0].medicine
        element.amountAvailable = arrayMedicines[0].amountAvailable
        element.situation = arrayMedicines[0].situation
        delete element.medicines
      })
      res.status(200).json(medicineInfo)
    }else {
      res.status(200).json({message: "Remédio indisponível nos postos"})
    }

    

  }catch(err) {
    res.status(500).json(err)
  }
}

const medicineController = {
  getMedicine,
}

module.exports = { medicineController }