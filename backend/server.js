import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

const app = express()
const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`)
})
const mongoUri = process.env.mongoURI

mongoose.connect(mongoUri)
.then(()=> console.log('Database connected'))
.catch(err => console.log(err));
