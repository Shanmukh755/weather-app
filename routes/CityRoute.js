const express = require('express')
const router = express.Router()
const cityController = require('../controller/CityController')

router.post('/', cityController.getCityWeather)

module.exports = router