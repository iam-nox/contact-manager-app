const mongoose = require('mongoose')
const Joi = require('joi')



const Contact = mongoose.model('Contact', new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
  }))


  const joiValidator = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/[0-9]/).min(6).max(14).required()
  })


  module.exports = { Contact, joiValidator }