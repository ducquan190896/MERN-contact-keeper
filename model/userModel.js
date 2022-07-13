const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please type your name']
    },
    email: {
        type: String,
        require: [true, 'please type your email']
    },
    password: {
        type: String,
        require: [true, 'please type your password']
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('User', userSchema)