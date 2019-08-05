var express = require("express");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var app = express();

mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });

app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

var campgroundSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  descripttion: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { campgrounds: allCampgrounds });
    }
  });
});

app.get("/campgrounds/new", function(req, res) {
  res.render("new");
});

app.post("/campgrounds", function(req, res) {
  var name = req.body.name;
  var imageUrl = req.body.imageUrl;
  var description = req.body.description;
  var newCampground = {
    name: name,
    imageUrl: imageUrl,
    description: description
  };
  Campground.create(newCampground, function(err, addCampground) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

app.get("/campgrounds/:id", function(req, res) {
  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      res.render("show", { campground: foundCampground });
    }
  });
});

app.listen(3000, function() {
  console.log("YelpCamp is running on port 3000.");
});
