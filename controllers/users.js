const { User, joiValidator } = require('../models/user')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const jwt = require('jsonwebtoken')


//register new user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { value, error } = joiValidator.validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email })
    if(user) return res.status(409).send('user already exist')

    user = new User(req.body)

    user.password = await bcrypt.hash(user.password, 10)

    await user.save()

    res.status(201).send(_.pick(user, ['username', 'email', '_id']))
})

//login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body
    
    if (!username || !password) return res.status(400).send('please enter username and password')
    
    let user = await User.findOne({ username })
    if(!user) return res.status(404).send('user not found')

    const match = await bcrypt.compare(password, user.password)

    if(!match) return res.status(400).send('username or password is incorrect')

    const token = jwt.sign(
        {
            _id: user._id,
            username: username,
            email: user.email 
        }, 
        process.env.TOKEN_KEY,
        { expiresIn: '5m' })

    res.header('x-auth-token', token).send('successfully logged in')
})

//get the current user
//@route POST /api/users/current
//@access private
const getCurrentUser = asyncHandler(async (req, res) => {
    res.send(req.user)
})


module.exports = {
    registerUser,
    loginUser,
    getCurrentUser
}