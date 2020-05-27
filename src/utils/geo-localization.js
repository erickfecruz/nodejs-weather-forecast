const request = require('postman-request')

// Using Mapbox API
// Insert your API Key here: 
const key = ''

const getLocal = (address, callback) => {
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + key + '&limit=1'
    
    request({ url: url, json: true }, (error, response) => {

        if (error) {
            callback('Unable to connect to API!', undefined)
        
        } else if (response.body.features.length === 0) {
            callback('Address not found!', undefined)

        } else {
            const local = response.body.features[0]
            data = {
                name: local.place_name,
                latitude: local.center[0],
                longitude: local.center[1]
            }
            callback(undefined, data)
        }
    })
}

module.exports = {
    getLocal: getLocal
}