var express = require("express");
var app =express();
var request = require("request");
var bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.render("home");
    
    
});


app.get("/movie", function(req, res){
    var entered = req.query.movieSearch;
    request(`https://omdbapi.com/?apikey=thewdb&s=/${entered}`, function(error, response, body){
        if(!error && response.statusCode == 200){
            // return the body.
            var searches = JSON.parse(body);
                res.render("movie", {searches: searches});
        }else if(!response.statusCode == 503){
            // If error recieved, explain what eror it is.
            console.log("Movie not found");
            res.send(`Encountered the error: ${error}.`);
        }
        
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Movie App Started!!!"); 
});