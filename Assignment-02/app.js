//import express.js module 
const express = require('express');
const bcrypt = require("bcryptjs");
const session = require("express-session");
//const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const flash = require('express-flash');
//app is an object that represents my web application (instance of express application)
const app = express();

const menuRoutes = require('./routes/menuRoutes');
const sign_upRoutes = require('./routes/sign_upRoutes');
const indexRoutes = require("./routes/indexRoutes");
const adminRoutes = require("./routes/adminRoutes");

const sessionAuth =  require("./middlewares/sessionAuth");

//const loginRoutes = require('./routes/loginRoutes');


//setting the PORT number for my server.
const PORT = 5000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
//convert data to json format
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const expresslayouts = require('express-ejs-layouts');
app.use(expresslayouts);

app.use(cookieParser());
app.use(flash());
const crypto = require('crypto');

// Generate a random 32-character hexadecimal string
const secretKey = crypto.randomBytes(16).toString('hex');

//Setting up a middleware
// Set up express-session middleware
app.use(
  session({
    secret: secretKey, 
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());
// Serve static files(stylesheets,images and client-side javascript) from the 'public' directory
app.use(express.static('public'));
app.use('/styles', express.static(__dirname + 'public/styles'))


app.use('/api/user_api', require('./routes/api/user_api'))
app.use('/api/menu_api', require('./routes/api/menu_api'))
// Adding routes
//app.use("/", routes);

// app.get('/login',(req,res)=>{
//   res.render("login")
// })
// app.get('/sign_up',(req,res)=>{
//   res.render("sign_up")
// });

app.get('/cart', (req, res) => {
  res.render('cart');
});
app.use('/', indexRoutes);
app.use('/', menuRoutes);
app.use('/',sign_upRoutes);
app.use('/',sessionAuth,adminRoutes);


//app.use('/login',loginRoutes);

const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb+srv://naamezafar:admin@cluster0.fqqs5jk.mongodb.net/Cafe");

//check database connected or not
connect.then(()=>{
    console.log("Database connected Successfully");
})
.catch(()=>{
    console.log("Database cannot be connected");
})


//Starting the express server and makes it listen for incoming requests on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



