const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();
const bodyParse = require('body-parser')
const cors = require('cors')
const Authrouter = require('./routes/AuthRouter')
const DashBoardRouter = require('./routes/DashBoardRouter')
const TicketRouter = require('./routes/TicketRouter')
const PaymentRouter = require('./routes/PaymentRouter') 

const app = express()
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`server started at ${PORT}`)
})
app.use(express.urlencoded({extended:true}))
app.use(bodyParse.json())
app.use(cors({
    origin:'https://show-time-six.vercel.app'
}))


app.use('/payment',PaymentRouter)
app.use('/auth', Authrouter)
app.use('/dashboard', DashBoardRouter)
app.use('/tickets', TicketRouter)


const mongoUri = process.env.mongoURI
mongoose.connect(mongoUri)
    .then(() => console.log('Database connected'))
    .catch(err => console.log(err));
