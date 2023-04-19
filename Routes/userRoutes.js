const userRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');
var path = require('path')
const {searchJobs,login,signup,updateProfile,postJob,applyJob, getApplications} = require('../Controller/userController')

userRouter.post('/signup',signup)
userRouter.post('/login',login)

const verifyToken = (req,res,next)=>{
    // const {token} = req.headers
    const token = req.headers['token']
    if(token){
        jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
            if(err){
                res.status(400).send({message:'Invalid token',error:err})
            }else{
                req.decoded = decoded
                next()
            }
        })
    }else{
        res.status(400).send({message:'Invalid token'})
    }
}

const verifyStudent = (req,res,next)=>{
    if(req.decoded.role=='student'){
        next()
    }else{
        res.status(400).send({message:'Unauthorized'})
    }
}

const verifyEmployer = (req,res,next)=>{
    if(req.decoded.role=='employer'){
        next()
    }else{
        res.status(400).send({message:'Unauthorized'})
    }
}

const verifyOfficer = (req,res,next)=>{
    if(req.decoded.role=='officer'){
        next()
    }else{
        res.status(400).send({message:'Unauthorized'})
    }
}

userRouter.post('/update',verifyToken,updateProfile)
userRouter.post('/postJob/:employer',verifyToken,verifyEmployer,postJob)

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
  })
const upload = multer({storage: storage})

userRouter.post('/apply/:student',verifyToken,verifyStudent,upload.single('cv'),applyJob)
userRouter.get('/getApplications/:job',verifyToken,verifyEmployer,getApplications)
userRouter.get('/getJobs/:search',verifyToken,searchJobs)
module.exports = userRouter;