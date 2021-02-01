 const express = require("express")
 const path = require("path")
 const hbs = require("hbs")
 const geocode = require("./utils/geocde")
 const forecast= require("./utils/forecast")

 const app = express();
const port = process.env.PORT || 3000
//define paths for express config
const viewsPath =path.join(__dirname,"../templates/views")
const publicDir = path.join(__dirname,"../public")
const partialPath = path.join(__dirname,"../templates/partials")

 //setup handlebars engine and views location
app.set("view engine","hbs")
app.set("views", viewsPath)
 hbs.registerPartials(partialPath)

 //setup static directory to serve
app.use(express.static(publicDir))


app.get("", (req, res)=>{
    res.render("index",{
        title: "Weather ",
        name : "jerry"
    })

})

 app.get("/help", (req , res)=>{
     res.render("Help",{
         helpMassege:"this a help message",
         title: "help",

         name: "jerry"
     })
 })

 app.get("/about",(req , res)=>{
     res.render("about", {title: "About Me", name: "jerry"})
 })

 app.get("/weather",(req , res)=>{
     if (!req.query.address){
         res.send({
             error: "you have to provide the address"
         })
     }else{
         geocode(req.query.address, (error ,  {x1 , x2 , location}={} )=>{
             if (error){
                 res.send({
                     error : "an error acurred"
                 }) ;

             }else{
                 forecast(x1, x2, (error2 , data2)=>{
                     if (error2){
                         res.send({error : error2})
                     }else{
                         console.log(location)
                         console.log(data2)
                         res.send({

                             location: location,
                             temperature : data2.current.temperature,
                             windSpeed: data2.current.wind_speed,
                             weatherIcon: data2.current.weather_icons[0],
                             weatherDescriptions:data2.current.weather_descriptions,
                             currentTime : data2.location.localtime
                         })
                     }

                 })
             }
         })

     }

 })

 app.get("/products",(req,res)=>{
     if (!req.query.search){
         res.send({
             error: "you must provide a search term"
         })
     }

else {
         console.log(req.query.search)
         res.send({
             'products': []
         })
     }

 })



 app.get("/help/*", (req, res)=>{
     res.render("404",{
         errorMessage : "error 404",
         name: "jerry"

     })
 })


 app.get("*",(req,res)=>{
     res.render("404",{
         errorMessage : "error 404",
         name: "jerry"
     })
 })



 app.listen(port, ()=>{
     console.log("server is up in port 3000.")
 })
