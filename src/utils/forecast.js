const request = require("request")


const forecast = function forecast(x1 , x2 , callback){
const url2 =  "http://api.weatherstack.com/current?access_key=e2eb358acecad15219c3e5e20d6887e1&query=" +x1 + "," + x2;

request({url : url2 , json : true}, (error , data)=>{
    if (error){
        callback("check you internet connection",undefined)
    }else if(data.body.error){
        callback("the given location does not appear to be working please try to specify the exact location", undefined)
    }else if(!data){
        callback("the given location does not appear to be working please try to specify the exact location",undefined)


        }else{
        const weatherInfo = data.body;
        // console.log(data.body)
        // callback(undefined,`the current weather is ${weatherInfo.current.temperature} but is feels like ${weatherInfo.current.feelslike}`)
        callback(undefined,weatherInfo)

    }
})


}
module.exports= forecast;