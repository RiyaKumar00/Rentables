const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const User = require("./models/users")
const cookie = require('cookie-parser');
const bycrypt = require('bcryptjs');

mongoose.connect("mongodb://localhost:27017")

const PORT = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');
app.use(cookie());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'));

// Routes
app.use("/", require("./routes/login"))
app.use("/register",require("./routes/register"));
app.use("/home",require("./routes/home"));
app.use("/view",require("./routes/view"));
app.use("/dashboard",require("./routes/dashboard"));
app.use("/logout",require("./routes/logout"));
app.use("/delete",require("./routes/delete"));
app.use("/addItem",require("./routes/addItem"));
app.use("/request",require("./routes/request"));
app.use("/search",require("./routes/search"));
app.use("/addReview",require("./routes/review"));
app.use("/renew",require("./routes/renew"));

var server = app.listen(PORT, function() {
  console.log("Server is running on port " + PORT);
})
