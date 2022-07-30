const request = require("postman-request");

forecast = (latitude, longitude, callback)=>{
    const url = "https://api.openweathermap.org/data/2.5/weather?lat="+encodeURIComponent(latitude)+"&lon="+encodeURIComponent(longitude)+"&units=metric&appid=c6f9f091528789c0a353f37e8cd13635"
    request({url, json: true}, (err, {body}= {})=>{
        console.log("----- Weather Forecast! -----");
        if(err){
            callback("Unable to access Weather Services!");
        }else if(body.length === 0){
            callback("Unable to access the Search Data!");
        }else{
            callback(undefined, {
                temp: body.main.temp
            })
        }
    });
}

module.exports = {
    forecast : forecast
}