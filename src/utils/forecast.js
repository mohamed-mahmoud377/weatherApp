const request = require("request")


const forecast = function forecast(x1 , x2 , callback){
const url2 =  "http://api.weatherstack.com/current?access_key=e2eb358acecad15219c3e5e20d6887e1&query=" +x1 + "," + x2;

request({url : url2 , json : true}, (error , {body})=>{
    if (error){
        callback("check you internet connection",undefined)
    }else if(body.error){
        callback("something went wrong", undefined)
    }else {
        const weatherInfo = body;
        console.log(body)
        callback(undefined,`the current weather is ${weatherInfo.current.temperature} but is feels like ${weatherInfo.current.feelslike}`)
        // callback(undefined,body)

    }
})


}
module.exports= forecast;