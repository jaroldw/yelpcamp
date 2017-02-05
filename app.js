var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/yelp_camp');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');


// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

Campground.create({
    name: 'Salmon Creek',
    image: "https://farm8.staticflickr.com/7268/7121859753_e7f787dc42.jpg"
}, function(err, campground) {
    if (err) {
        console.log(err);
    } else {
        console.log(campground);
    }
});

app.get('/', function(req, res) {
    res.render('landing');
});

app.get('/campgrounds', function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds', {
                campgrounds: allCampgrounds
            });
        }
    });
});

app.post('/campgrounds', function(req, res) {
    // get data from form and add to campground array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {
        name: name,
        image: image
    };
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            // redirect back to campgrounds
            res.redirect('/campgrounds');
        }
    })
});

app.get('/campgrounds/new', function(req, res) {
    res.render('new.ejs');
});
//app.listen(process.env.PORT, process.env.IP, function(){
app.listen(8080, function() {
    console.log("YelpCamp Server has Started!");
});
