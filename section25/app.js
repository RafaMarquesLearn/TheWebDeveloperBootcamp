const express = require("express");
const app = express();

app.get("/", function (req, res) {
    console.log("Entering the Home Page...");
    res.send("Hi there!");
});

app.get("/about", function (req, res) {
    console.log("Entering the About Page...");
    res.send("About page.");
});

app.get("*", function (req, res) {
    res.send("Sorry, we could not found any page for this address. Is it correct?");
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running!");
});
