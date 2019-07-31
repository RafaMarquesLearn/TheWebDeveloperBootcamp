var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// APP CONFIG
var app = express();
mongoose.connect("mongodb://localhost/restful_blog_app", {
  useNewUrlParser: true
});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// MODEL CONFIG
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now }
});
var Blog = mongoose.model("Blog", blogSchema);

// SAMPLE DATA CREATION
/* Blog.create({
  title: "My dream peaceful place",
  image:
    "https://images.freeimages.com/images/large-previews/079/quiet-place-1369425.jpg",
  body: "This is the kind place where I want to live!"
});
 */
// ROUTES

// INDEX
app.get("/", function(req, res) {
  res.redirect("/blogs");
});

app.get("/blogs", function(req, res) {
  Blog.find({}, function(err, blogs) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { blogs: blogs });
    }
  });
});

// NEW
app.get("/blogs/new", function(req, res) {
  res.render("new");
});

// CREATE
app.post("/blogs", function(req, res) {
  Blog.create(req.body.blog, function(err, newBlog) {
    if (err) {
      console.log(err);
      res.render("new");
    } else {
      res.redirect("/blogs");
    }
  });
});

// RUN APP
app.listen("3000", function() {
  console.log("Blog is up and running!");
});
