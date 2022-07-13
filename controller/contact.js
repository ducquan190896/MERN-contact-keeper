const express = require('express')
const {check, validationResult} = require('express-validator')
const {authentication} = require('../middleware/authenticate')
const contactmodel = require('../model/contactModel')
const Contact = require('../model/contactModel')

const router = express.Router()

router.route('/').get(authentication, async (req, res) => {

try {
    const contacts = await Contact.find({user: req.user._id})
if(!contacts) {
    return res.status(400).json({
        message: 'contacts not found'
    })
}
console.log(contacts)
res.status(200).json(contacts)

} catch (err) {
    res.status(400).json({message: 'error in server'})
}
})

router.route('/addcontact').post(authentication, 
    check('name').not().isEmpty(),
    check('email').isEmail()
    , async (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({error: errors.array()})
        }
        try {
            const {email, name} = req.body
            let contact = await Contact.findOne({email, name})
            if(contact) {
                return res.status(400).json({
                    message: 'contact is existed'
                })
            }
            contact = await Contact.create({...req.body, user: req.user._id})
            if(!contact) {
                return res.status(400).json({
                    message: 'contact is not created'
                })
            }
            res.status(200).json(contact)
    

        } catch (err) {
            res.status(400).json({
                message: err.message
            })
        }
    })


router.route('/:ID').put(authentication, 
    // check('name').not().isEmpty(),
    // check('email').isEmail(),
    async (req, res) => {
        console.log(req.params.ID)
        // const errors = validationResult(req)
        // if(!errors.isEmpty()) {
        //     return res.status(400).json({error: errors.array()})
        // }
        try {
            let contact = await Contact.findById(req.params.ID)
            if(!contact) {
                return res.status(400).json({message: 'contact not found'})
            }
            if(contact.user.toString() !== req.user._id.toString()) {
                return res.status(400).json({message: 'no authorize to change the contact'})
            } 
            
            contact = await Contact.findByIdAndUpdate(req.params.ID, req.body, {new: true})

            if(!contact) {
                return res.status(400).json({message: 'contact cannot be updated'})
            }
            res.status(200).json(contact)


        } catch (err) {
            res.status(400).json({
                message: err.message
            })
        }
    }    
)

router.route('/:ID').delete(authentication, async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.ID)
        if(!contact) {
            return res.status(400).json({
                message: 'contact not found'
            })
        }
        if(contact.user.toString() !== req.user._id.toString()) {
            return res.status.apply(400).json({
                message: 'not authorize to make update'
            })
        }
        await Contact.findByIdAndRemove(req.params.ID)
        res.status(200).json({message: 'contact is deleted'})
 
    } catch (err) {
        res.status(401).json({message: 'error in server'})
    }

})

module.exports = router