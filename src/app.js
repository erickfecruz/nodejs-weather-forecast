const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoloc = require('./utils/geo-localization')
const forecast = require('./utils/forecast')

const app = express()

// Paths
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Handle bars and view
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Erick Cruz'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        about1: 'Hello World! My name is Erick Cruz.',
        about2: 'I am a Software Developer, if you want to check more projects follow me in ',
        name: 'Erick Cruz'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText1: 'This site was developed with the purpose of integrating different APIs (Mapbox and Weatherstack) in a NodeJS server to get the current weather forecast for a desired location.',
        helpText2: 'Use the search engine to find your desired location. If the location is found, the result will provide:',
        item1: 'Location.',
        item2: 'Weather.',
        item3: 'Temperature.',
        item4: 'Feels like temperature.',
        title: 'Help',
        name: 'Erick Cruz'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geoloc.getLocal(req.query.address, (error, geoData) => {
        if (error) {
            return res.send({ error })
        }

        forecast.getForecast(geoData, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                location: geoData.name,
                weather: forecastData.weather,
                temp: forecastData.temp,
                feel: forecastData.feelslike,
                waetherimg: forecastData.weatherimg
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Erick Cruz',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Erick Cruz',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})