var express = require("express");
var router = express.Router();
const MenuItem = require("../models/menu_item");

router.get("/admin-index", (req, res) => {
    res.render('admin-index',{layout: './admin-layout.ejs'})
});

router.get('/all', async (req, res) =>{
    let menu_items = await MenuItem.find();
    res.render('./admin/all', {layout: './admin-layout.ejs',menu_items})
  });

router.get('/delete', async (req, res) =>{
    let menu_items = await MenuItem.find();
    res.render('./admin/delete', {layout: './admin-layout.ejs',menu_items})
  });

router.get("/delete/:id", async (req, res) => {
    console.log(req.params.id)
    const menu_item = await MenuItem.findByIdAndDelete(req.params.id);
    res.redirect("/admin-index");
});

router.get('/update', async (req, res) =>{
  let menu_items = await MenuItem.find();
  res.render('./admin/update', {layout: './admin-layout.ejs',menu_items})
});

router.get('/update/:id', async (req, res) =>{
  console.log(req.params.id)
  const menu_item = await MenuItem.findById(req.params.id);
  res.render("./admin/update_form", {layout: './admin-layout.ejs',menu_item});
});

router.post("/update/:id", async (req, res) => {
  const menu_item = await MenuItem.findById(req.params.id);
  menu_item.name = req.body.name;
  menu_item.description = req.body.description;
  menu_item.price = req.body.price;
  menu_item.category = req.body.category;
  await menu_item.save();
  res.redirect("/admin-index");
});

router.get('/add', (req, res) =>{
  res.render('./admin/add',{layout: './admin-layout.ejs'})
});

router.post("/add", async (req, res) => {
    // let error = MenuItem.validate(req.body);
    // if (error) {
    //     req.session.flash = { type: "success", message: error.details[0].message };
    //     return res.redirect("back");
    // }
    let menu_item = new MenuItem(req.body);
    await menu_item.save();
    req.session.flash = { type: "success", message: "Item Saved!" };
    res.redirect("/admin-index");
  });


  router.get("/all/:page?", async (req, res) => {
    let page = req.params.page ? req.params.page : 1;
    page = Number(page);
    let pageSize = 3;
    let menu_items = await MenuItem.find()
      .limit(pageSize)
      .skip((page - 1) * pageSize);
    let menu_itemCount = await MenuItem.countDocuments();
    let totalPages = Math.ceil(menu_itemCount / pageSize);
    res.render("./admin/all", {
      layout: "admin-layout",
      menu_items,
      page,
      totalPages,
    });
  });

module.exports = router;