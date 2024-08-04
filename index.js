const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotEnv = require('dotenv')
const cityRouter = require('./routes/CityRoute') 

const app = express()

dotEnv.config()
app.use(cors())
app.use(bodyParser.json())

const PORT = process.env.PORT || 8080

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('MongoDB connected succesfully')
})
.catch((err)=>{
    console.log('Error: ', err)
})

app.use('/weather', cityRouter)

app.listen(PORT, ()=>{
    console.log(`Server is started and running at PORT: ${PORT}`)
})