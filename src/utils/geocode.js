const request = require('request');

geocode = (query, callback) => {
    url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(query)+".json?access_token=pk.eyJ1IjoibmlzY2hhbDA5NyIsImEiOiJja2h3OWVvZTcxdXNuMnlwYm5kMDd4dm5wIn0.Pg3Zsd-VOoyTG6FjFmoXTQ&limit=1",
    request({url, json: true}, (error, {body}={}) =>{
        if (error) {
            callback('Unable to connect to the mapbox api.')
        } else if (body.features.length == 0) {
            callback('No relevant results found for the query.')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1], 
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    })
} 

module.exports = geocode