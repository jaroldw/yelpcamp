var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

var campgrounds = [
    {name: 'Salmon Creek', image: "https://farm8.staticflickr.com/7268/7121859753_e7f787dc42.jpg"},
    {name: 'Granite Hill', image: "https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg"},
    {name: "Mountain's Goat Rest", image: "https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg"},
];

app.get('/', function(req, res){
    res.render('landing');
});

app.get('/campgrounds', function(req, res){
    res.render('campgrounds', {campgrounds: campgrounds});
});

app.post('/campgrounds', function(req, res){
    // get data from form and add to campground array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    // redirect back to campgrounds
    res.redirect('/campgrounds');
});

app.get('/campgrounds/new', function(req, res){
    res.render('new.ejs');
});
//app.listen(process.env.PORT, process.env.IP, function(){
app.listen(8080, function(){
    console.log("YelpCamp Server has Started!");
});