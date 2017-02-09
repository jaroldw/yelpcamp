var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Campground = require('./models/campground'),
    seedDB = require('./seeds');

var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp"
mongoose.connect(url);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');
seedDB();

app.get('/', function(req, res) {
    res.render('landing');
});

// INDEX
app.get('/campgrounds', function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {
                campgrounds: allCampgrounds
            });
        }
    });
});

// CREATE
app.post('/campgrounds', function(req, res) {
    // get data from form and add to campground array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {
        name: name,
        image: image,
        description: desc
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

// NEW
app.get('/campgrounds/new', function(req, res) {
    res.render('new');
});

// SHOW
app.get('/campgrounds/:id', function(req, res) {
    // find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground)
            res.render("show", {campground: foundCampground});
        };
    })
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server has Started!");
});
