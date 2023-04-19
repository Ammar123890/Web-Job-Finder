const mongoose = require('mongoose');	
const express = require('express');
const userRouter = require('./Routes/userRoutes')
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/user',userRouter);

app.listen(process.env.PORT||3000, ()=>{
    console.log(`App listening at port ${process.env.PORT}`)
})


mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>console.log('Connected to MongoDB')).catch((err)=>console.log(err));

