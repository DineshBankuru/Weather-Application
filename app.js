require("dotenv").config();
const express=require("express");
const https=require("https");
const request = require("request");
const app=express();
const { find } = require('geo-tz');
const bodyParser = require('body-parser');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/",function(req,res){
    res.render("home");
});







let first={temp:"" , icon:"" , place:"", country:"" , description:""};
var d = [{hours: 0 , ampm : "" , temp: "" , icon:""},{hours: 0 , ampm : "" , temp: "" , icon:""},{hours: 0 , ampm : "" , temp: "" , icon:""},{hours: 0 , ampm : "" , temp: "" , icon:""},{hours: 0 , ampm : "" , temp: "" , icon:""}];
let all ={one:"" , two:"" , three:"" , four:"" , five:""};
var hour="";
var ampm="";
var hours=0;
var city="";
var lat,long;
var flag=0;

app.post("/loc" , function(req,res){

    if(req.body.lat === "")
    {
        res.render("location");
    }
    else{
    let url = "http://api.openweathermap.org/data/2.5/weather?lat="+req.body.lat+"&lon="+req.body.lon+"&appid="+process.env.API_KEY+"&units=metric";

    request(url, function(err, response, body) {
        // On return, check the json data fetched
        //console.log(body);
        if (err) {
            res.send("Error");
           // res.render("location");
        }
        else 
        {
            let w = JSON.parse(body);
           // res.send(w);
            if(w.cod === 200)
            {
                first.temp = w.main.temp;
                first.icon = "https://openweathermap.org/img/wn/"+w.weather[0].icon+"@2x.png";
                first.place = "";
                city=(first.place);
                let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
                first.country = "";
                // first.country = w.sys.country;
                first.description =  w.weather[0].description.charAt(0).toUpperCase() + w.weather[0].description.slice(1);

                lat = w.coord.lat;
                long = w.coord.lon;

                all.one=w.wind.speed;
                all.two=w.main.humidity;
                all.three=w.main.pressure;
                all.four=w.main.temp_max;
                all.five=w.main.temp_min;
                flag=1;

            }
            else
            {
                flag=0;
                res.render("location");
                
            }
        }
    });
    
if(flag===1){    
    url = "http://api.openweathermap.org/data/2.5/forecast?lat="+req.body.lat+"&lon="+req.body.lon+"&appid="+process.env.API_KEY+"&units=metric";

    //console.log(url);

    request(url, function(err, response, body) {
        if (err) {
            res.send("Error");
           // res.render("location");
        }
        else 
        {
            let w = JSON.parse(body);
           
            let options = {
                timeZone: find(lat,long),
                hour: 'numeric'
              },
              formatter = new Intl.DateTimeFormat([], options);
            hour = (String(formatter.format(new Date())));
            hours = Number( hour.substring(0, hour.indexOf(' ')));
            ampm = String(hour.substring(hour.indexOf(' ') + 1)); 
            ampm = ampm.slice(0,2);
            //console.log(hours);
            //console.log(ampm);
            
            for(var i=0;i<3;i++)
            {
                if((hours+3*i) === 12 && ampm==="AM")
                {
                    d[i].hours = 12;
                }
                else if((hours+3*i) === 12 && ampm==="PM")
                {
                    d[i].hours = 0;
                }
                else
                {
                    d[i].hours = ((hours+3*i)%12);
                }
                d[i].temp = parseInt(w.list[i].main.temp);
                d[i].icon = "https://openweathermap.org/img/wn/"+w.list[i].weather[0].icon+"@2x.png";
                //console.log(d[i].icon);
                var check = ((hours%12)+3*i);
                if( check >= 12)
                {
                    if(ampm == "PM")
                    {
                        d[i].ampm = "AM";
                    }
                    else if(ampm == "AM")
                    {
                        d[i].ampm="PM";
                    }
                }
                else
                {
                    d[i].ampm=ampm;
                }
            }

            options = {
                timeZone: find(lat,long),
                day:"numeric",
                month: "long",
                weekday: 'long'
              },
              formatter = new Intl.DateTimeFormat([], options);
              let newD = (String(formatter.format(new Date())));
              //console.log(newD);
            //console.log(details);
            res.render("final" , {first: first , d:d , all:all , newD: newD});
            //res.send("Hi");
        
        }
    });
    }
    }
});


app.post("/",function(req,res){
    city = req.body.city;
    let url = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+process.env.API_KEY+"&units=metric";
    request(url, function(err, response, body) {
        // On return, check the json data fetched
        //console.log(body);
        if (err) {
            //res.send("Error");
            res.render("notfound");
        }
        else 
        {
            let w = JSON.parse(body);
            console.log(w);
            if(w.cod === 200)
            {
                first.temp = w.main.temp;
                first.icon = "https://openweathermap.org/img/wn/"+w.weather[0].icon+"@2x.png";
                first.place = w.name;
                let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
                first.country = regionNames.of(w.sys.country);
                // first.country = w.sys.country;
                first.description =  w.weather[0].description.charAt(0).toUpperCase() + w.weather[0].description.slice(1);

                lat = w.coord.lat;
                long = w.coord.lon;

                all.one=w.wind.speed;
                all.two=w.main.humidity;
                all.three=w.main.pressure;
                all.four=w.main.temp_max;
                all.five=w.main.temp_min;
                flag=1;
            }
            else
            {
                flag=0;
                res.render("notfound");
                
            }
        }
    });
if(flag===1)
{
    url = "http://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+process.env.API_KEY+"&units=metric";

    request(url, function(err, response, body) {
        if (err) {
           // res.send("Error");
             //res.render("location");
        }
        else 
        {
            let w = JSON.parse(body);
            
            let options = {
                timeZone: find(lat,long),
                hour: 'numeric'
              },
              formatter = new Intl.DateTimeFormat([], options);
            hour = (String(formatter.format(new Date())));
            hours = Number( hour.substring(0, hour.indexOf(' ')));
            ampm = String(hour.substring(hour.indexOf(' ') + 1)); 
            ampm = ampm.slice(0,2);
            //console.log(hours);
            //console.log(ampm);
            for(var i=0;i<3;i++)
            {
                if((hours+3*i) === 12 && ampm==="AM")
                {
                    d[i].hours = 12;
                }
                else if((hours+3*i) === 12 && ampm==="PM")
                {
                    d[i].hours = 0;
                }
                else
                {
                    d[i].hours = ((hours+3*i)%12);
                }
                d[i].temp = parseInt(w.list[i].main.temp);
                d[i].icon = "https://openweathermap.org/img/wn/"+w.list[i].weather[0].icon+"@2x.png";
                //console.log(d[i].icon);
                var check = (hours%12+3*i);
                if( check >= 12)
                {
                    if(ampm == "PM")
                    {
                        d[i].ampm = "AM";
                    }
                    else if(ampm == "AM")
                    {
                        d[i].ampm="PM";
                    }
                }
                else
                {
                    d[i].ampm=ampm;
                }
            }

            options = {
                timeZone: find(lat,long),
                day:"numeric",
                month: "long",
                weekday: 'long'
              },
              formatter = new Intl.DateTimeFormat([], options);
              let newD = (String(formatter.format(new Date())));
              //console.log(newD);
            //console.log(details);
            res.render("final" , {first: first , d:d , all:all , newD: newD});
            //res.send("Hi");
        }
    
    });
}
});



const PORT = process.env.PORT || 3000;


app.listen(PORT, function() {
    console.log("Server started!!");
});
