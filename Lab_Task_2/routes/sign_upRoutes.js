const express = require('express');
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// Route to render the menu page
router.get('/sign_up', (req, res) => {
  res.render('sign_up',{user: req.session.user});
});

//Register User
router.post("/sign_up", async (req,res)=>{
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }


  //check if user already exists in the database
  let user = await User.findOne({name: data.email});
  //const existingEmail = await User.findOne({email: data.email});
  if(user){
    console.log(user);
    //res.send("User already exists. Please choose a different username.");
    req.flash("danger", "User with given email already registered");
    return res.redirect("/sign_up");
  }
  else {
    user = new User(req.body);
    //hash the password using bycrypt
    const salt = await bcrypt.genSalt(10); //Number of salt round for bycrypt
    user.password = await bcrypt.hash(data.password,salt);

    //user.password = hashedPassword; //replace the hash password with original password
    //const userdata = await User.insertMany(data);
    //console.log(userdata);

    await user.save();
    req.flash("success", "Registered Successfully. Please log in.");
    return res.redirect("/login");
  }

});
router.get("/login", (req, res) => {
  const errorMessage = req.flash('error')[0]; // Retrieve the flash message
  // es.render('login', { errorMessage });
    return res.render("login", {layout: './null_layout',errorMessage})
});

router.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });

  if (!user) {
    req.flash("danger", "User with this email not present");
    return res.redirect("/sign_up");
  }
  const validPassword = await bcrypt.compare(req.body.password,user.password);
  console.log(validPassword);
  if (validPassword) {
    req.session.user = user;
    console.log(req.session.user);
    // req.flash("success", "Logged in Successfully");
    return res.redirect("/");
  } else {
    // req.flash("danger", "Invalid Password");
    return res.redirect("/login");
  }
});

router.get('/logout', (req, res) => {
  req.session.user = null;
  res.redirect('index');
});
//Login user 
// router.post("/login", async (req,res)=> {
//   console.log(req.body);
//   //try{
//     let user = await User.findOne({name: req.body.email});
//     //const emailCheck = await User.findOne({email: req.body.email})
//     if(!user){
//       //res.send("User name does not exist");
//       req.flash("danger", "User with this email does not exist");
//       return res.redirect("/login");
//     }
    
  
//     //compare the hash password from the database with the plain text
//     const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
//     if(isPasswordMatch){
//       req.session.user = user;
//       req.flash("success", "Logged in Successfully");
//       return res.redirect("/");
//       //res.render("index");
//     }else{
//       //req.send("Wrong password");
//       req.flash("danger", "Invalid Password");
//       return res.redirect("/login");
//     }
//   //}
//   // catch(error){
//   //   //res.send("Wrong Details");
//   //   console.error(error);
//   //   res.status(500).send("Internal Server Error");
//   // }
// })

module.exports = router;