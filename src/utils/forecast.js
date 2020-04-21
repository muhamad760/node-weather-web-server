const request = require('request');

const forecast = (latitude,longitude,callback)=>{

    const url = 'https://api.darksky.net/forecast/e46570aa30e3f86400b5ace8212df794/'+latitude+','+longitude+'?units=si'

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather service',undefined)
        }else if(body.error){
            callback('Invalid location entry',undefined)
        }else{
            callback(undefined,body.daily.data[0].summary+
                        " it's currently "+body.currently.temperature+" degrees out. There is "
                    +body.currently.precipProbability+"% chance of rain minimum tempreture is "
                    +body.daily.data[0].temperatureMin+" maximum tempreture is "+body.daily.data[0].temperatureMax+
                    " through the day");
        }
    })

}

module.exports = forecast