const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HealthCentersSchema = new Schema ({
  nome: {
    type: String,
    required: true
  },
  endereco: {
      type: String,
      requered: true
  },
  telefone: {
    type: String,
    required: true
  },
  horario: {
    type: String,
    required: true
  },
  latitude: {
    type: String,
    required: true
  },
  longitude: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model("HealthCenter", HealthCentersSchema)