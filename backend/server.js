import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();
import bodyParse from 'body-parser'
import cors from 'cors'
import AuthRouter from './Routes/AuthRouter.js'

const app = express()
const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`)
})


app.use(bodyParse.json())
app.use(cors())
app.use('/auth',AuthRouter)


const mongoUri = process.env.mongoURI
mongoose.connect(mongoUri)
.then(()=> console.log('Database connected'))
.catch(err => console.log(err));
