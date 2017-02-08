var mongoose = require('mongoose');
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://farm4.staticflickr.com/3541/3802455097_85490befa2.jpg",
        description: "Blah blah blah"
    },
    {
        name: "Desert Mesa",
        image: "https://farm5.staticflickr.com/4043/4475243824_c63479a1cd.jpg",
        description: "Blah blah blah"
    },
    {
        name: "Canyon Floor",
        image: "https://farm8.staticflickr.com/7457/9586944536_9c61259490.jpg",
        description: "Blah blah blah"
    },
]
function seedDB() {
    // Remove all campgrounds
    Campground.remove({}, function(err) {
        if (err) {
            console.log(err);
        }
        console.log("removed campgrounds");

        // add a few campgrounds
        data.forEach(function(seed) {
            Campground.create(seed, function(err, campground) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("added a campground");
                        // create a comment
                        Comment.create({
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment) {
                            if (err) {
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                    }})
            });
    });
};


module.exports = seedDB;