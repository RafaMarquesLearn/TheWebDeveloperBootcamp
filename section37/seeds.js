var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: 'Norway Landscap',
        imageUrl:
            'https://thumbs.dreamstime.com/b/lofoten-summer-camping-norwegian-fjord-arctic-mountains-coast-landscape-norway-110156728.jpg',
        description: 'Camping somewhere in Norway coast'
    },
    {
        name: 'Camping in Sweden',
        imageUrl:
            'https://thumbs.dreamstime.com/b/tent-camping-equipment-kungsleden-trail-sweden-king-s-kings-one-43570757.jpg',
        description: 'Camping in Sweden'
    },
    {
        name: 'Camping with the stars',
        imageUrl:
            'https://thumbs.dreamstime.com/b/camping-under-stars-wilderness-pitched-tent-glowing-night-sky-milky-way-snowy-mountains-background-nature-129081958.jpg',
        description: 'Enjoy the amazing night sky, full of stars'
    },
    {
        name: 'Lake camping',
        imageUrl: 'https://thumbs.dreamstime.com/b/camping-14037483.jpg',
        description: 'Peaceful camping by the lake with friends'
    },
    {
        name: 'Australian Desert',
        imageUrl: 'https://thumbs.dreamstime.com/b/camping-4797021.jpg',
        description: 'Friends enjoying a meal in Australian desert'
    }

]

function seedDB() {
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("removed campgrounds!");
        data.forEach(function (seed) {
            Campground.create(seed, function (err, campground) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Added a campground.");
                    Comment.create(
                        {
                            text: "This place is great and all, but it would be perfect if there was internet, just saying...",
                            author: "SocialMediaAddict"
                        }, function (err, comment) {
                            if (err) {
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Added a comment.");
                            }
                        });
                }
            });
        });
    });
}

module.exports = seedDB;