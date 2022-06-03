const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema ({
  CredentialId: {
    type: Schema.Types.ObjectId,
    ref: "Credentials"
  },
  name: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    required: true,
  },
  DateOfBirth: {
    type: String,
    required: true
  },
}, { timestamps: true })

module.exports = mongoose.model("Employer", UserSchema)