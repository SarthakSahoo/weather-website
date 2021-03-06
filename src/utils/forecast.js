const request = require('request')

const forecast = (latitude, longitude, callback) => {
	const url = 'https://api.darksky.net/forecast/a511f133f65ece793ca4d3c43e7582e7/'+ latitude + ',' + longitude + '?units=si'

	request({ url, json: true }, (error, { body }= {}) => {
		if(error) {
			callback('Unable to connect to weather service', undefined)
		} else if(body.error) {
			callback('Unable to find location', undefined)
		} else {
			callback(undefined,body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degree out. There is a " +
			body.currently.precipProbability + "% chance of rain. The high today is " + body.daily.data[0].temperatureHigh + " degree with a low of " +
			body.daily.data[0].temperatureLow + " degree.")
		}
	})
}

module.exports = forecast