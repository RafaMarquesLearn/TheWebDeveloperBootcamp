var express = require("express");
var bodyparser = require("body-parser");
var app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

var campgrounds = [
    { name: "Teepee Night Sky", imageUrl: "https://pixabay.com/get/57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c732c72dd944ac15c_340.jpg" },
    { name: "Night Aurora", imageUrl: "https://pixabay.com/get/57e1dd4a4350a514f6da8c7dda793f7f1636dfe2564c704c732c72dd944ac15c_340.jpg" },
    { name: "Camping Cliff", imageUrl: "https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c732c72dd944ac15c_340.jpg" }
];

app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/campgrounds", function (req, res) {
    res.render("campgrounds", { campgrounds: campgrounds });
});

app.get("/campgrounds/new", function (req, res) {
    res.render("new");
});

app.post("/campgrounds", function (req, res) {
    var name = req.body.name;
    var imageUrl = req.body.imageUrl;
    var newCampground = { name: name, imageUrl: imageUrl }
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.listen(3000, function () {
    console.log("YelpCamp is running on port 3000.");
});