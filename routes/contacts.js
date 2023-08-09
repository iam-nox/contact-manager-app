const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const {
    getContacts,
    getContact,
    postContact,
    updateContact,
    deleteContact
} = require('../controllers/contacts')

router.use(auth)
router.get('/', getContacts).post('/', postContact)
router.get('/:id', getContact).put('/:id', updateContact).delete('/:id', deleteContact)

module.exports = router