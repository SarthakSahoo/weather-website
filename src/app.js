const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Sarthak Sahoo'
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Sarthak Sahoo'
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		description: 'Hi There! So you have faced some problem han. Contact us on abc@gmail.com ',
		name: 'Sarthak Sahoo'
	})
})

app.get('/weather', (req, res) => {
	if(!req.query.address) {
		return res.send({
			error: 'Address must be provided'
		})
	}
	geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({ error })
		}
		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({ error })
			}
			res.send({
				forecast: forecastData,
				location,
				address: req.query.address
			})
		})
	})
})

app.get('/products', (req, res) => {
	if(!req.query.search) {
		return res.send({
			error: 'You must provide a search term'
		})
	} 
	console.log(req.query.search)
	res.send({
		products: []
	})
})

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Sarthak',
		errorMessage: 'Help Article Not Found'
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Sarthak',
		errorMessage: 'Page Not Found'
	})
})

app.listen(3000, () => {
	console.log('Server is up on port 3000')
})