const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CodeVerificationSchema = new Schema ({
  code: {
    type: Number,
    required: true,
    unique: true
  },
  active: {
    type: Boolean,
    default: true
  }
}, { timestamps: true })

module.exports = mongoose.model("CodeVerification", CodeVerificationSchema)