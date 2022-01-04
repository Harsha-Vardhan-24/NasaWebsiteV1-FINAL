const express = require("express");
const app = express();
const https = require("https")
app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 
app.use(express.static('public'));
app.set('view engine', 'ejs');
const factful = require('factful.js');
let facts = factful.fact()
const apiKey = "uyVwi4r52alrYBDjK4WDG3tjmoL8ctxdxo1X6G60";


var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();

const port = 3000||process.env.PORT


app.get("/", function(req, res){
    const fact = facts.space
    res.render("home", {fact: fact});
});

app.get("/apod", function(req, res){
    const apodUrl = "https://api.nasa.gov/planetary/apod?api_key=" + apiKey;
    https.get(apodUrl, function(response){
        response.on("data", function(data){
            const apiData = JSON.parse(data)
            const date = apiData.date
            const url = apiData.url
            const title = apiData.title
            const exp = apiData.explanation
            res.render("apod", {
                date: date,
                url: url,
                title: title,
                exp: exp
            });
        })
    })
    
});

app.get("/mars-weather", function(req, res){
    const marsUrl = "https://api.maas2.apollorion.com"
    https.get(marsUrl, function(response){
        response.on("data", function(data){
            const marsWeather = JSON.parse(data)
            const minTemp = marsWeather.min_temp
            const maxTemp = marsWeather.max_temp
            const howIsPressure = marsWeather.pressure_string
            const marsWeDesc = marsWeather.atmo_opacity
            const marsSun = marsWeather.sunrise
            const marsSet = marsWeather.sunset
            res.render("mars-weather", {
                minTemp: minTemp,
                maxTemp: maxTemp,
                howIsPressure: howIsPressure,
                marsWeDesc: marsWeDesc,
                marsSun: marsSun,
                marsSet: marsSet
            })
        });
    });
});

app.get("/near-earth", function(req, res){
    res.render("near-object")
});

app.get("/mars-photos", function(req, res){
    // const marsImagesUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/latest_photos?api_key=uyVwi4r52alrYBDjK4WDG3tjmoL8ctxdxo1X6G60"
    // https.get(marsImagesUrl, function(response){
    //     response.on("data", function(data){
    //         console.log(data);
    //         console.log(JSON.parse(data));
    //     })
    // })
    // res.render("mars-images")
    

});


app.get("/about", function(req, res){
    res.render("about")
});

const PORT = process.env.PORT || "8080"

app.set("port", PORT);