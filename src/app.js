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
        title: "weather ",
        name : "jerry"
    })

})

 app.get("/help", (req , res)=>{
     res.render("help",{
         helpMassege:"this a help message",
         title: "help",

         name: "jerry"
     })
 })

 app.get("/about",(req , res)=>{
     res.render("about", {title: "about me", name: "jerry"})
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
                     error : "an error acuured"
                 }) ;

             }else{
                 forecast(x1, x2, (error2 , data2)=>{
                     if (error){
                         res.send({error : error2})
                     }else{
                         console.log(location)
                         console.log(data2)
                         res.send({

                             location: location,
                             forecast : data2
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
