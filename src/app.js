const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.port || 3000

const publicDirectoryName = path.join(__dirname,'../public')
const viewDirectoryName = path.join(__dirname, '../templates/views')
const partialsDirectoryName = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewDirectoryName)
hbs.registerPartials(partialsDirectoryName)

app.use(express.static(publicDirectoryName))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Nischal Sanil'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Page',
        name: 'Nischal Sanil'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Nischal Sanil'
    })
})

app.get('/weather',(req, res) => {
    if (!req.query.address){
        return res.send({error: 'Address must be provided.'})
    }
    geocode(req.query.address, (error, {latitude , longitude , location}={}) => {
        if (error) return res.send({error})
        forecast(latitude, longitude, (error, forecastData) =>{
            if (error) return res.send({error})
            res.send({location, forecastData, address: req.query.address})
        })
    })
})

app.get('/help/*', (req,res) => {
    res.render('error', {
        title: '404',
        name: 'Nischal Sanil',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Nischal Sanil',
        errorMessage: 'Page not found!'
    })
})

app.listen(port, () => console.log('Server Started on port '+port+'.'))