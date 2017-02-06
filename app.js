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
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: 'Granite Hill',
//     image: "https://farm8.staticflickr.com/7268/7121859753_e7f787dc42.jpg",
//     description: "This is a huge granite hill, no bathrooms. No water. Beautiful granite!"
// }, function(err, campground) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(campground);
//     }
// });

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
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        };
})
});

//app.listen(process.env.PORT, process.env.IP, function(){
app.listen(8080, function() {
    console.log("YelpCamp Server has Started!");
});
