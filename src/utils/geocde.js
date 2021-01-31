const request = require("request")


const geocode = (address , callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURI(address)+".json?access_token=pk.eyJ1IjoiamVycnkzNzciLCJhIjoiY2trZGJxMjdyMDg0YjJ2bW5zaGF2NHM5ayJ9.m-PD68x_5hN9o2H9B8oLJQ&limit=1"
    request({url:url, json: true},(error, {body})=>{
        if (error){
            callback("check your internet connection ", undefined)
        }else if (body.message){
            callback("something went wrong",undefined)

        }else if(body.features.length===0) {
            callback("the given name is not right" , undefined)
        }else
        {
            let x1 = body.features[0].center[0];
            let x2 = body.features[0].center[1];
            let location= body.features[0].place_name;
            callback(undefined, {x1 : x1 , x2 :x2,location:location})
        }
    })
}
module.exports= geocode;