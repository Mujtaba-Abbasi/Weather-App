const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ghulam Mujtabas'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ghulam Mujtaba '
    })
})

app.get('/products', (req, res)=>{

    if(!req.query.search){
        return res.send({
            error: "You must provide the Search Term"
        })
    }

    console.log(req.query.search);

    res.send({
        products : []
    })
})

app.get('/help', (req, res) => {
    
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Ghulam Mujtaba',
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if(!address){
        return res.send({
            error: "Address must be provided!"
        })
    }

    geocode.geocode(address, (err, {latitude, longitude, location} = {})=>{
        if(err){
            return res.send({err})
        }

        forecast.forecast(latitude, longitude, (err, forecastData)=>{
            if(err){ 
                return res.send({err})
            }
            
            res.send({
                forecast: forecastData,
                location,
                address
            });
        });
    });
  
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ghulam Mujtaba',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ghulam Mujtaba',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})