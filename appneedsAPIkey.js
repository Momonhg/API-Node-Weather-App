const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
//allow me to look
// through the body of the post request and fetch the data based on the name of my input,

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html")

  //// by doing this we just need to chnage the query or transfer
  //more data from the user to the our server to get more data from external server
});

app.post("/", function(req, res) {
  
  const query = req.body.cityName;
  const apiKey = ;// put your API key here const apiKey = "yourAPIkey"
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p> The weather is currently " + description + "</p>");
      res.write("<h1>The temp in " +query+ " is " + temp + "</h1>");
      res.write("<img src=" + imageURL + " >");
      res.send();
    })
  })
  // create a app.post link from html form to get the info from the input
  // console.log(req.body.cityName);
  // check with bodyParser take info from body of html. from the attribute cityName
})




app.listen(3000, function() {
  console.log("Server 3000");

});
