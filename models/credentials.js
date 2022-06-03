const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CredentialsSchema = new Schema ({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  healthCenterId: {
    type: Schema.Types.ObjectId,
    ref: "HealthCenterId"
  }
}, { timestamps: true })  

module.exports = mongoose.model("Credentials", CredentialsSchema)