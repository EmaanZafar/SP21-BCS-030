// menuRoutes.js

const express = require('express');
const router = express.Router();
const MenuItem = require("../models/menu_item");



// router.get('/menu', async(req, res) =>{
//   let menu_items = await MenuItem.find();
//   console.log(menu_items)
//   res.render('menu', {menu_items});
// });


router.get('/menu', async (req, res) => {
const category = req.query.category; // Get the category parameter from the query string
let menu_items;
console.log('Category:', category);
if (category) {
    menu_items = await MenuItem.find({ category: category });
    console.log(menu_items);
} else {
    menu_items = await MenuItem.find();
}
res.render('menu', { menu_items, category ,user: req.session.user});
 });


 router.get("/cart/:id", async function(req,res,next){
    let menu_item = await MenuItem.findById(req.params.id);
    console.log("Add this Product in cart");
    let cart = [];
    if(!req.cookies.cart) req.cookies.cart;
    cart.push(menu_item);
    res.cookie("cart",cart);
    res.redirect("/menu")
  })

router.get('/cart',(req,res)=>{
    let  cart =[];
    //let cart = req.cookies.cart;
    // if (!cart){
    //   cart = [];
    // }
    console.log(cart);
    res.render("cart",{user: req.session.user,cart});
  })
//    router.get('/coffee', async(req, res) =>{
//     const category = 'Coffee';
//    let menu_items = await MenuItem.find({category: category});
//    console.log(menu_items)
//     res.render('menu', {menu_items});
// });

// router.get('/menu', async(req, res) =>{
//   const category = 'Dessert'
// let menu_items = await MenuItem.find({category: category});
// console.log(menu_items)
// res.render('menu', {menu_items});
// });

// router.get('/menu', async(req, res) =>{
//   const category = 'Starter';
// let menu_items = await MenuItem.find({category: category});
// console.log(menu_items)
// res.render('menu', {menu_items});
//  });

module.exports = router;
