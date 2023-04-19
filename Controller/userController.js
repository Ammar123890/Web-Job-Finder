const User = require('../Models/User')
const Job = require('../Models/Job')
const Application = require('../Models/Application')
const jwt = require('jsonwebtoken')

const signup = (req,res)=>{
    const {name, email, password, role,contacts} = req.body;

    const newUser = new User({name:name, email:email, password:password, role:role, contacts:contacts})
    newUser.save().then((user)=>{
        res.status(200).send({message:'Successfully added user',user:user})
    }).catch((err)=>res.status(400).send({message:'Error adding user',error:err}))

}

const login = (req,res)=>{
    const {email, password} = req.body;
    User.findOne({email:email}).then((user)=>{
        if(user){
            if(user.password==password){
                const token = jwt.sign({id:user._id,role:user.role},process.env.SECRET_KEY,{expiresIn:'24h'})
                res.status(200).send({message:'Successfully logged in',user:user,token:token})
            }else{
                res.status(400).send({message:'Invalid credentials'})
            }
        }else{
            res.status(400).send({message:'Invalid credentials'})
        }
    }).catch((err)=>{res.status(400).send({message:'Error logging in',error:err})})
}

const updateProfile = (req,res)=>{
    const {name, email, password, role,contacts} = req.body;
    User.findOneAndUpdate({_id:req.user._id},{name:name, email:email, password:password, role:role, contacts:contacts}).then((user)=>{
        res.status(200).send({message:'Successfully updated profile',user:user})
    }).catch((err)=>{res.status(400).send({message:'Error updating profile',error:err})})
}

const postJob = (req,res)=>{
    const employer = req.params.employer
    const {title,description,location,salary,company,tags} = req.body;
    const newJob = new Job({
        title:title,
        description:description,
        tags:tags,
        employer:employer,
        location:location||null,
        salary:salary||null,
        company:company||null})
    newJob.save().then((job)=>{
        res.status(200).send({message:'Successfully posted job',job:job})
    }).catch((err)=>{res.status(400).send({message:'Error posting job',error:err})})
}

const applyJob = (req,res)=>{
    const student = req.params.student;
    const cvLocation = req.file.filename
    const message = req.body.coverMessage;
    const job = req.body.job;

    const newApplication = new Application({
        student:student,
        cv:cvLocation,
        coverMessage:message,
        job:job
    })
    newApplication.save().then((application)=>{
        res.status(200).send({message:'Successfully applied job',application:application})
    }).catch((err)=>{res.status(400).send({message:'Error applying job',error:err})})
}

const getApplications = (req,res) => {
    Application.find({job:req.params.job}).then((applications)=>{
        res.status(200).send({message:'Successfully retrieved applications',applications:applications})
    }).catch((err)=>{res.status(400).send({message:'Error retrieving applications',error:err})})
}

const searchJobs = async (req, res) => {
    const search = req.params.search;
    Job.find({$text:{$search:search}}).then((jobs)=>{
        res.status(200).send({message:'Successfully retrieved jobs',jobs:jobs})
    }).catch((err)=>{res.status(400).send({message:'Error retrieving jobs',error:err})})
}

module.exports = {searchJobs,getApplications,applyJob,postJob,updateProfile,login,signup}
