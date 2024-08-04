const CityModel = require('../model/City')
const https = require('https')


const getCityWeather = async (req, res)=>{
    try{
        const {city} = req.body
        const cityModel = new CityModel({city})
        await cityModel.save()
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`
        https.get(url, (response)=>{
            response.on('data', (data)=>{
                const weatherData = JSON.parse(data)
                console.log(weatherData)
                res.status(201).json(weatherData)
            })
        })
    } catch (err) {
        res.send(401).json({message: '401 NOT FOUND',})
    }
}

const getSearchHistory = async(req, res)=>{
    try{
        const city = await CityModel.find()
        if (!city){
            return res.status(404).json({message: 'City NOT FOUND'})
        }
        res.status(200).json(city)
    } catch(err){
        console.log('There is an error')
        res.status(500).json({message: 'server error'})
    }
}

module.exports = {getCityWeather, getSearchHistory}