const request = require('postman-request')

// Using WeatherStack API
// Insert your API Key here: 
const key = 'd25c649774737cb673d29c132573c954'

const getForecast = (address, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=' + key +  '&query=' + address.longitude + ',' + address.latitude

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to API!', undefined)
        
        } else if (response.body.error !== undefined) {
            callback('Address not found!', undefined)

        } else {
            const current = response.body.current
            const data = {
                temp: current.temperature,
                feelslike: current.feelslike,
                weather: current.weather_descriptions[0],
                weatherimg: current.weather_icons[0]
            }
            callback(undefined, data)

        }
    })
}

module.exports = {
    getForecast: getForecast
}