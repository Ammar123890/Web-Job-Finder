const mongoose = require('mongoose');	

const userSchema = mongoose.Schema({
    name:{
        required: true,
        type: String
    },
    email:{
        required: true,
        type: String
    },
    password:{
        required: true,
        type: String
    },
    role:{
        required: true,
        type: String
    },
    contacts:{
        type:[]
    }
})

module.exports = mongoose.model('User', userSchema);