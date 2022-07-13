const User = require('../model/userModel')
const jwt = require('jsonwebtoken')


const authentication = async (req, res, next) => {
    try {
        console.log(req.headers.authorization )
        if(!req.headers.authorization) {
        return    res.status(400).json({
                message: 'error in authorization'
            })
        }

        const token = req.headers.authorization.split(' ')[1]
        console.log(token)
        const decoded =  jwt.verify(token, process.env.private_key)
        if(!decoded) {
            return  res.status(400).json({
                message: 'error in authorization'
            })
        }

        const userid = decoded._id

        const user = await User.findById(userid)

        req.user = user
        console.log(user)
        
        next()




    } catch (err) {
        res.status(402).json({message: 'error in server'})
    }
}

module.exports = {authentication}