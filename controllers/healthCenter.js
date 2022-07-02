const healthCenterModel = require('../models/healthCenter')
const medicineModel = require('../models/medicine')

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
  listHealthCenter
}

module.exports = { healthCenterController }
