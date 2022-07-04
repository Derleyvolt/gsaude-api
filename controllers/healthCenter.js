const healthCenterModel = require('../models/healthCenter')
const medicineModel = require('../models/medicine')
var mongoose = require('mongoose'); // pra tentar a conversão da linha 10

const listMedicine = async(req, res) => {
  // recebo healthCenterId
  // e um parâmetro
  console.log(req.body.healthCenterId)

  const healthCenterResult = await healthCenterModel.findOne({_id: mongoose.Types.ObjectId(req.body.healthCenterId)})

  if(healthCenterResult == undefined) {
    res.status(500).json({ type: "Erro", message: "Nao existem posto com esse id"})
  } else {
    if(req.params.type == '1') {
      //listar remédios disponíveis

      const available_medicines = await healthCenterResult.filter((e) => e.situation.type == "available")
      res.status(200).json(healthCenterResult.medicines)
    } else if(req.params.type == '2') {
      //remédios em falta
  
      const missing_medicines = await healthCenterResult.filter((e) => e.situation.type == "missing")
      res.status(200).json(missing_medicines)
    } else if(req.params.type == '3') {
      //remédios chegando
    
      const coming_medicines = await healthCenterResult.filter((e) => e.situation.type == "coming")
      res.status(200).json(coming_medicines)
    }
  }

}

function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

function getDistance(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in kilometers
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in KM
  return d;
}

const listHealthCenter = async(req, res) => {
  try {
    const healthCenterList = await healthCenterModel.find({name: req.body.healthCenterName})
      
    let result = []

    for(let hc of healthCenterList) {
      if(req.body.latitude == undefined || req.body.longitude == undefined) {
        result.push({ Name: hc.name, latitude: hc.latitude, longitude: hc.longitude, 
                      Message: "não foi possivel calcular a distancia" })
      } else {
        result.push({ Name: hc.name, latitude: hc.latitude, longitude: hc.longitude, 
                      Distance: getDistance(parseFloat(req.body.latitude), parseFloat(req.body.longitude), 
                      parseFloat(hc.latitude), parseFloat(hc.longitude)) })
      }
    }
    
    res.status(200).json(result)

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
  getHealthCenter,
  listHealthCenter,
  listMedicine
}

module.exports = { healthCenterController }
