var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

// index
router.get("/", function(req, res) {
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", { campgrounds: allCampgrounds });
    }
  });
});

// new
router.get("/new", isLoggedIn, function(req, res) {
  res.render("campgrounds/new");
});

// create
router.post("/", isLoggedIn, function(req, res) {
  var name = req.body.name;
  var imageUrl = req.body.imageUrl;
  var description = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newCampground = {
    name: name,
    imageUrl: imageUrl,
    description: description,
    author: author
  };
  Campground.create(newCampground, function(err, addCampground) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

// show
router.get("/:id", function(req, res) {
  Campground.findById(req.params.id)
    .populate("comments")
    .exec(function(err, foundCampground) {
      if (err) {
        console.log(err);
      } else {
        res.render("campgrounds/show", { campground: foundCampground });
      }
    });
});

// edit
router.get("/:id/edit", isLoggedIn, function(req, res) {
  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      res.render("campgrounds/edit", { campground: foundCampground });
    }
  });
});

// update
router.put("/:id", isLoggedIn, function(req, res) {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(
    err,
    foundCampground
  ) {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

// delete
router.delete("/:id", isLoggedIn, function(req, res) {
  Campground.findByIdAndDelete(req.params.id, function(err) {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds/");
    }
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
