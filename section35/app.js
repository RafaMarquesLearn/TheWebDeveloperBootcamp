var express = require("express");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");
var seedDB = require("./seeds");

var app = express();
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
seedDB();

app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// ==========================
// PASSPORT CONFIGURATION
// ==========================
app.use(require("express-session")({
  secret: "The birds are all falling!",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ==========================
// CAMPGROUND ROUTES
// ==========================
app.get("/", function (req, res) {
  res.render("landing");
});

app.get("/campgrounds", function (req, res) {
  Campground.find({}, function (err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", { campgrounds: allCampgrounds });
    }
  });
});

app.get("/campgrounds/new", function (req, res) {
  res.render("campgrounds/new");
});

app.post("/campgrounds", function (req, res) {
  var name = req.body.name;
  var imageUrl = req.body.imageUrl;
  var description = req.body.description;
  var newCampground = {
    name: name,
    imageUrl: imageUrl,
    description: description
  };
  Campground.create(newCampground, function (err, addCampground) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

app.get("/campgrounds/:id", function (req, res) {
  Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/show", { campground: foundCampground });
    }
  });
});

// ==========================
// COMMENTS ROUTES
// ==========================

app.get("/campgrounds/:id/comments/new", function (req, res) {
  Campground.findById(req.params.id, function (err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { campground: foundCampground });
    }
  });
});

app.post("/campgrounds/:id/comments", function (req, res) {
  Campground.findById(req.params.id, function (err, foundCampground) {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      Comment.create(req.body.comment, function (err, comment) {
        if (err) {
          console.log(err);
        } else {
          foundCampground.comments.push(comment);
          foundCampground.save();
          res.redirect("/campgrounds/" + foundCampground._id);
        }
      });
    }
  });
});

// ==========================
// AUTH ROUTES
// ==========================
app.get("/register", function (req, res) {
  res.render("register");
});

app.post("/register", function (req, res) {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function () {
      res.redirect("/campgrounds");
    });
  });
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.post("/login", passport.authenticate("local", {
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
}), function (req, res) {

});

app.listen(3000, function () {
  console.log("YelpCamp is running on port 3000.");
});
