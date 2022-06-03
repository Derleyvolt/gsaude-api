const userModel = require('../models/user')
const credentialsModel = require('../models/credentials')
const bcrypt = require('bcrypt')

// new user
const newUser = async(req,res) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.password, salt)
    let credential = {
      email: req.body.email,
      password: req.body.password,
      healthCenterId : req.body.healthCenterId
    }
    credential.password = hashedPass

    const newCredential = new credentialsModel(credential)
    const credentialSaved = await newCredential.save()

    const user = {
      credentialId: credentialSaved._doc._id,
      name: req.body.name,
      dateOfBirth: req.body.dateOfBirth,
      cpf: req.body.cpf,
    }
    const newUser = new userModel(user)
    const userSaved = await newUser.save()

    res.status(200).json(userSaved)

  } catch (err) {
    res.status(500).json(err)
  }
}

const userController = {
  newUser
}

module.exports = { userController }