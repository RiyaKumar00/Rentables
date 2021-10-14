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

var server = app.listen(PORT, function() {
  console.log("Server is running on port " + PORT);
})
