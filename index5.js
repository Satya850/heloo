//models
const mongoose=require('mongoose')
const Schema=mongoose.Schema
const passportLocalMongoose=require('passport-local-Mongoose');
var groominfo=new Schema({
	username:{

	type:String
},
password:{
	type:String
},
dob:{
	type:Date
},
email:{
	type:String
},
age:{
	type:Number
}
})
groominfo.plugin(passportLocalMongoose);
module.exports=mongoose.model('groomtable',groominfo)
// server.js file
const express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = 
        require("passport-local-mongoose");
const Matriuser = require("./model/gdb");
let app = express();

mongoose.connect("mongodb://localhost/matrimony");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("express-session")({
    secret: "Rusty is a dog",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(Matriuser.authenticate()));
passport.serializeUser(Matriuser.serializeUser());
passport.deserializeUser(Matriuser.deserializeUser());

//=====================
// ROUTES
//=====================

// Showing home page
app.get("/", function (req, res) {
    res.render("home");
});

// Showing secret page
app.get("/secret", isLoggedIn, function (req, res) {
    res.render("secret");
});

// Showing register formisLoggedIn
app.get("/register", function (req, res) {
    res.render("register");
});

// Handling user signup
app.post("/register", async (req, res) => {
    const user = await Matriuser.create({
      username: req.body.username,
      password: req.body.password,
      dob:req.body.dob,
      email:req.body.email,
      age:req.body.age
    });
  
    return res.status(200).json(user);
  });

//Showing login form
app.get("/login", function (req, res) {
    res.render("login");
});

//Handling user login
app.post("/login", async function(req, res){
    try {
        // check if the user exists
        const user = await Matriuser.findOne({ username: req.body.username });
        if (user) {
          //check if password matches
          const result = req.body.password === user.password;
          if (result) {
            res.render("secret");
          } else {
            res.status(400).json({ error: "password doesn't match" });
          }
        } else {
          res.status(400).json({ error: "User doesn't exist" });
        }
      } catch (error) {
        res.status(400).json({ error });
      }
});

//Handling user logout 
app.get("/logout", function (req, res) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
});



function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}


app.listen(3000, function () {
    console.log("Server Has Started!");
});
// views home.js
<h1>This is a home page</h1>
<li><a href="/register">Sign up!</a></li>
<li><a href="/login">Login</a></li>
<li><a href="/logout">Logout</a></li>
// logi. ,js
<h1>login</h1>
<form action="/login" method="POST">
<input type="text" name="username" placeholder="username">
<input type="password" name="password" placeholder="password">
<button>login</button>
</form> 
<h1>This is a home page</h1>
<li><a href="/register">Sign up!</a></li>
<li><a href="/login">Login</a></li>
<li><a href="/logout">Logout</a></li>
</input>
</form>
// register.js file
<h1>Sign up form</h1>
<form action="/register" method="POST">
     <input type="text" name="username" placeholder="Name" required>
    <input type="password" name="password" placeholder="Password" required>   
    <input type="date" name="dob" placeholder="Date of Birth" required>
    <input type="email" name="email" placeholder="email" required>
    <input type="number" name="age" placeholder="age" required>
    <button type="submit">Submit</button>
  </form>
<h1>This is home page</h1>
<li><a href="/register">Sign up!!</a></li>
<li><a href="/login">Login</a></li>
<li><a href="/logout">Logout</a></li>
// sercer.js
<h1>This is Secret page</h1>
<li><a href="/register">Sign up!</a></li>
<li><a href="/login">Login</a></li>
<li><a href="/logout">Logout</a></li>