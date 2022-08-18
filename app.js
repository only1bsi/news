
const { Console } = require("console");
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { request } = require("http");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))


app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html") 
})

app.post("/", function(req, res){
     
     const firstName = req.body.fname;
     const lastName = req.body.lname;
     const email = req.body.email;
     console.log(firstName, lastName, email)

     const data = {
        members:[
            {
                email_addres:email,
                status:"suscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME: lastName
                }
            }
        ]
     }
      const jsonData = JSON.stringify(data)

      const url = "https://us18.api.mailchimp.com/3.0/ping/cfd2bd0d3e"

      const option = {
        dc:"cfd2bd0d3e",
        apikey:"f658586d285c43a02bebc2bec8da33a3-us18",
        method:"post",
        auth:"bukar:f658586d285c43a02bebc2bec8da33a3-us18"
      }

      const request = https.request(url, option, function(response){

     if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html")
     } else (
        res.sendFile(__dirname + "/failure.html")
     )
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
      })

      request.write(jsonData);
      request.end();
}) 

app.post("/failure", function(req, res){
    res.redirect("/")
})

app.listen(3000, function(req, res){
    console.log("server started at port 3000")
})

// apiKey
// d6ac526d7bfc1987ddca002d6988521e-us18
// f658586d285c43a02bebc2bec8da33a3-us18


// list Id
// cfd2bd0d3e