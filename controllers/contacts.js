const { Contact, joiValidator } = require('../models/contact')
const asyncHandler = require('express-async-handler')

const idValidatorPatern = /^[a-f\d]{24}$/i

//get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user._id })
    res.send(contacts)
})

//get contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
    const id = req.params.id
    
    const isValid = idValidatorPatern.test(id)
    if(!isValid) return res.status(400).send('please enter a valid id')

    const contact = await Contact.findById(id)
    if(!contact) return res.status(404).send('contact not found')

    if(contact.user_id.toString() !== req.user._id) 
    return res.status(403).send('access to the requested resource is forbidden')

    res.send(contact)
})

//post new contact
//@route POST /api/contacts
//@access private
const postContact = asyncHandler(async (req, res) => {
    const { value, error } = joiValidator.validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const { name, email, phone } = req.body

    const contact = await new Contact({
        name,
        email,
        phone,
        user_id: req.user._id
    }).save()

    res.send(contact)
})

//update contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
    const id = req.params.id
    
    const isValid = idValidatorPatern.test(id)
    if(!isValid) return res.status(400).send('please enter a valid id')

    let contact = await Contact.findById(id)
    if(!contact) return res.status(404).send('contact not found')

    if(contact.user_id.toString() !== req.user._id) 
    return res.status(403).send('access to the requested resource is forbidden')
    
    for (key in req.body) {
        contact[key] = req.body[key]
    }
    
    await contact.save()
    res.send(contact)
})

//delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    const id = req.params.id
    
    const isValid = idValidatorPatern.test(id)
    if(!isValid) return res.status(400).send('please enter a valid id')

    const contact = await Contact.findById(id)
    if(!contact) return res.status(404).send('contact not found')

    if(contact.user_id.toString() !== req.user._id) 
    return res.status(403).send('access to the requested resource is forbidden')
    
    res.send(await contact.deleteOne())
})



module.exports = {
    getContacts,
    getContact,
    postContact,
    updateContact,
    deleteContact
}