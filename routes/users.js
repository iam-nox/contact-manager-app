const express = require('express')
const router = express.Router()
const {
    registerUser,
    loginUser,
    getCurrentUser
} = require('../controllers/users')
const authUser = require('../middlewares/auth')


router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/current', authUser, getCurrentUser)


module.exports = router