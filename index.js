const http = require('http');
const fs = require('fs');
const requests = require('requests');

const homeFile = fs.readFileSync('home.html','utf-8');
const firstFile = fs.readFileSync('first.html','utf-8');

 
//express 

var express = require("express");
var app     = express();
var path    = require("path");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

 
  app.get('/',function(req,res){
  
    res.write(firstFile);  
    
  });

  app.post('/submit',function(req,res){

    var city=req.body.getcity;
   // var city1 = String(city);
    // var s1="http://api.openweathermap.org/data/2.5/weather?q="+city;
    // var s2="&appid=8702c1d0d45928a82778b20f4203dc42"+s1;
    // console.log(s2);
    
        requests("http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=8702c1d0d45928a82778b20f4203dc42")
        .on("data",(chunk)=>{
            const objdata = JSON.parse(chunk);
            const arrData = [objdata];
            // console.log(arrdata[0].main.temp);
            var realTimeData = homeFile.replace("{%tempval%}",(arrData[0].main.temp-273.15).toFixed(2)).replace("{%tempmin%}",(arrData[0].main.temp_min-273.15).toFixed(2)).replace("{%tempmax%}",(arrData[0].main.temp_max-273.15).toFixed(2))
            .replace("{%location%}",arrData[0].name).replace("{%country%}",arrData[0].sys.country).replace("{%tempstatus%}",arrData[0].weather[0].main);

            res.write(realTimeData);
            
           // res.write(realTimeData);
             console.log(realTimeData);

            })
        .on("end",(err)=>{
            if(err)return console.log('connection closed error');
            res.end();
           // console.log('end');
        });
  
    
    
  });


  app.listen(4000);
  console.log("Running at Port 3000");



//







// const server = http.createServer((req,res)=>{
//     if(req.url=='/'){

//         res.write(firstFile);       
       
//     }
//     else if(req.url=='/search'){

//         requests("http://api.openweathermap.org/data/2.5/weather?q=agra&appid=8702c1d0d45928a82778b20f4203dc42")
//         .on("data",(chunk)=>{
//             const objdata = JSON.parse(chunk);
//             const arrData = [objdata];
//             // console.log(arrdata[0].main.temp);
//             var realTimeData = homeFile.replace("{%tempval%}",(arrData[0].main.temp-273.15).toFixed(2)).replace("{%tempmin%}",(arrData[0].main.temp_min-273.15).toFixed(2)).replace("{%tempmax%}",(arrData[0].main.temp_max-273.15).toFixed(2))
//             .replace("{%location%}",arrData[0].name).replace("{%country%}",arrData[0].sys.country).replace("{%tempstatus%}",arrData[0].weather[0].main);

//             res.write(realTimeData);
            
//            // res.write(realTimeData);
//              console.log(realTimeData);

//             })
//         .on("end",(err)=>{
//             if(err)return console.log('connection closed error');
//             res.end();
//            // console.log('end');
//         });

//     }

// });

// server.listen('8000','127.0.0.1',()=>{
//     console.log('server is listening');
// });