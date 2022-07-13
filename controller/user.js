const express = require('express')

const {check, validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/userModel')
const {authentication} = require('../middleware/authenticate')

const router = express.Router()


router.route('/').post(
    check('name').not().isEmpty(),
    check('email').isEmail(),
    check('password').isLength({min: 4})
    , async (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({error: errors.array()})
        }


    try {
        let {name, email, password} = req.body
    
    let user = await User.findOne({email})
    if(user) {
        return res.status(400).json({message: 'user is alreayd existing'})
    }
    const salt = await bcrypt.genSalt(10)
    password = await bcrypt.hash(password, salt)

    user = await User.create({name, email, password})
    if(!user) {
        return res.status(400).json({message: 'user is not created'})
    }

    const token =  jwt.sign({_id: user._id}, process.env.private_key, {expiresIn: '30d'})

    res.status(200).json({
        email: user.email, 
        name: user.name,
        createdAt: user.createdAt,
        token
        
    })
    } catch (err) {
       return res.status(400).json({message: err.message})
    }
    
})


router.route('/signin').post( 
    check('email').isEmail(),
    check('password').isLength({min: 4})
    , async (req, res) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({error: errors.array()})
        }

    try {
        const {email, password} = req.body
        let user = await User.findOne({email})

        if(!user) {
            return res.status(400).json({message: 'user is not existed'})
        }

        const iscorrect = await bcrypt.compare(password, user.password) 
        if(!iscorrect) {
            return res.status(400).json({message: 'not authorized to log in'})
        }
        user = await User.findOne({email}).select('-password')
        const token = jwt.sign({_id: user._id}, process.env.private_key)

        res.status(400).json({
            email: user.email,
            name: user.name,
            createdAt: user.createdAt,
            token
        })


    } catch (err) {
       return res.status(400).json({message: err.message})
    }
})

router.route('/').get(authentication, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password')
    if(!user) {
        return res.status(400).json({})
    }
    res.status(200).json(user)
    } catch (err) {
        console.log('hello')
        res.status(400).json({message: 'error in server'})
    }
})


module.exports = router