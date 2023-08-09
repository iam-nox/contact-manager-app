const mongoose = require('mongoose')
const Joi = require('joi')



const User = mongoose.model('User', new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
  }, {
    timestamps: true
  }
  ))


  const joiValidator = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(14).required()
  })


  module.exports = { User, joiValidator }