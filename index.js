const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotEnv = require('dotenv')
const https = require('https')

const app = express()

dotEnv.config()
app.use(cors())
app.use(bodyParser.json())

const PORT = process.env.PORT || 8080

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('MongoDb connected succesfully')
})
.catch((err)=>{
    console.log('Error: ', err)
})

app.get('/', (req, res)=>{
    const apiKey = '2892ca25f05ddbf8bcd6baf11165af05'
    const {city} = req.body
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    https.get(url, (response)=>{
        response.on('data', (data)=>{
            const weatherData = JSON.parse(data)
            console.log(weatherData)
            res.send(weatherData)
        })
    })
})

app.listen(PORT, ()=>{
    console.log(`Server is started and running at PORT: ${PORT}`)
})