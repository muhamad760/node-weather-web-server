const request = require('request');

const geoCode = (address,callback)=>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibXVoYW1hZDc2MCIsImEiOiJjazc3cDJvb24wOGQ4M2VwZGp0OWd6eDNiIn0.-Wk_HMGqO7cym3FMbaAmuA&limit=1'

    request({url,json:true},(error,{body})=>{
           if(error){
               callback('Unable to connect to server',undefined);
            }else if(body.features.length === 0){
                callback('Can not find the location,try other searches',undefined);
            }else{
                callback(undefined,{
                    latitude:body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    place_name:body.features[0].place_name
                })
            }
    })
}

module.exports = geoCode