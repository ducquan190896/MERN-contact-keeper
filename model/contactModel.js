const mongoose = require('mongoose')


const contactSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        require: [true, 'please type name of the contact']
    },
    email: {
        type: String,
        require: [true, 'please type email of the contact']
    },
    phone: {
        type: String
    },
    type: {
        type: String,
        default: 'personal',
        enum: ['personal', 'professional']
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Contact', contactSchema)