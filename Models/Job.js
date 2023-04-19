const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    employer:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tags:{
        type:[],
        required:true
    },
    company:{
        type:String
    },
    location:{
        type:String
    },
    salary:{
        type:Number
    }
})
jobSchema.index({'$**': 'text'});

module.exports = mongoose.model('Job', jobSchema)