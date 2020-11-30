const request = require('request');

forecast = (lat, lon, callback) => {
    url = "https://api.openweathermap.org/data/2.5/weather?lat="+encodeURIComponent(lat)+"&lon="+encodeURIComponent(lon)+"&appid=2a403d606a36fcc95e8e6cb125f62b6c&units=metric"
    request({url, json: true}, (error, {body}={}) =>{
        if (error) {
            callback('Unable to connect to the weather api.')
        } else if (body.cod == '400') {
            console.log(body.message)
        } else {
            callback(undefined, 'It is currently '+body.main.temp+'\xB0 C and It feels like '+body.main.feels_like+'\xB0 C.');
        }
    })
} 

module.exports = forecast