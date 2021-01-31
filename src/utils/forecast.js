const request = require("request")


const forecast = function forecast(x1 , x2 , callback){
const url2 =  "http://api.weatherstack.com/current?access_key=e2eb358acecad15219c3e5e20d6887e1&query=" +x1 + "," + x2;

request({url : url2 , json : true}, (error , data)=>{
    if (error){
        callback("check you internet connection",undefined)
    }else if(data.body.error){
        callback("something went wrong", undefined)
    }else if(!data){
        callback("we are bot able to get the weather from the given location",undefined)


        }else{
        const weatherInfo = data.body;
        console.log(data.body)
        callback(undefined,`the current weather is ${weatherInfo.current.temperature} but is feels like ${weatherInfo.current.feelslike}`)
        // callback(undefined,body)

    }
})


}
module.exports= forecast;