const userModel = require('../models/user')
const credentialsModel = require('../models/credentials')
const codeVerificationModel = require('../models/codeVerification')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')

//login
const login = async(req,res) => {
  try {
    const credential = await credentialsModel.findOne({ email: req.body.email })
    
    if(credential === null) {
      res.status(200).json({type:'warning', message: "Usuário ou senha incorreto"})
    }else {
      const validPassword = await bcrypt.compare(req.body.password, credential.password)
      if(!validPassword) {
        res.status(200).json({type: 'warnig', message: 'Usuário ou senha incorreto'})
      }else {
        const user = await userModel.findOne({ credentialId: credential._id})
        const { credentialId, ...others} = user._doc
        if(credential.healthCenterId !== undefined) {
          others.healthCenterId = credential.healthCenterId
        }
        res.status(200).json(others)
      }
    }

  }catch(err) {
    res.status(200).json(err)
  }
}

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

// send email to user
const sendCodeVerificationToUser = async(req,res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "gsaudeapp@gmail.com",
        pass: process.env.PASSWORDAPP
      }
    })

    let active = false
    let code
    while(active != true) {
      code = Math.floor(Math.random() * 9999 + 1)
      let response = await codeVerificationModel.findOne({ code })
      if(response == null) {
        const newCode = new codeVerificationModel({ code })
        await newCode.save()
        active = true

      }else {
        active = false
      }
    }

    const emailOption = {
      from: "gsaudeapp@gmail.com",
      to: req.body.email,
      subject: "Código de verificação",
      html: `
        <div style="border:1px solid #dadce0; border-radius:8px; padding:40px 20px;">
          <center>
            <div style="border-bottom:1px solid #dadce0;">
              <h1>Bem-vindo ao Gsaúde !</h1>
            </div>
            <p>
              Seu código é <strong>${code}</strong> 
            </p>
          </center>
        </div>
      `
    }
    transporter.sendMail(emailOption)
    res.status(200).json({ message: "email has been send" })

  }catch(err) {
    res.status(500).json(err)
  }
}

const userController = {
  login,
  newUser,
  sendCodeVerificationToUser
}

module.exports = { userController }