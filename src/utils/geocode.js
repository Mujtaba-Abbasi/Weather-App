const request = require("postman-request")

geocode = (address, callback) => {
    const url = "https://api.openweathermap.org/geo/1.0/direct?q=" + encodeURIComponent(address) + "&limit=5&appid=c6f9f091528789c0a353f37e8cd13635"
    request({ url, json: true }, (err, { body }) => {
        
        if (err) {
            callback("Unable to Connect to Location Services!");
        } else if (body.length === 0) {
            callback("Unable to find the location search!")
        }
        else {
            callback(undefined, {
                location: body[0].name,
                longitude: body[0].lat,
                latitude: body[0].lon,
            })
        }
    })
}

module.exports = {
    geocode: geocode
}