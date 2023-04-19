const mongoose = require('mongoose');

const ApplicationSchema = mongoose.Schema({
    student:{
        type: String,
        required: true
    },
    job:{
        type: String,
        required:true
    },
    cv:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    coverMessage:{
        type: String,
        required: true
    },
    accepted:{
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Application', ApplicationSchema);