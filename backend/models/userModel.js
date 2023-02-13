const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: [true, 'Please add first name']
    },
    lastName: {
        type: String,
        required: [true, 'Please add last name']
    },
    DoB:{
        type: String,
        required: true,
        default: ''
    },
    country:{
        type: String,
        required: true,
        enum: ['Bulgaria', 'United Kingdom', 'France', 'Germany', 'Italy']
    },
    email: {
        type: String,
        required:[true, 'Please add a email'],
        unique: true
    },
    password: {
        type: String,
        required:[true, 'Please add a pasword']
    },
    position:{
        type: String,
        required: false,
        default: 'codeIT'
    },
    image: {
        type: String,
        required: false,
        default: '/images/sample.jpg'
    }
},{
    timestamps: true
})



module.exports = mongoose.model('User', userSchema)