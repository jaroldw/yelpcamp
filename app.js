var express = require('express');
var app = express();

var campgrounds = [
    {name: 'Salmon Creek', image: "https://farm8.staticflickr.com/7268/7121859753_e7f787dc42.jpg"},
    {name: 'Granite Hill', image: "https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg"},
    {name: "Mountain's Goat Rest", image: "https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg"},
];

app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('landing');
});

app.get('/campgrounds', function(req, res){
    res.render('campgrounds', {campgrounds: campgrounds});
});

//app.listen(process.env.PORT, process.env.IP, function(){
app.listen(8080, function(){
    console.log("YelpCamp Server has Started!");
});