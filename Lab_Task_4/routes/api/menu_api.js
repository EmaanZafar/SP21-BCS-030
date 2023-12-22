var express = require ("express");
var router = express.Router();
const MenuItem = require("../../models/menu_item");

router.get("/", async (req, res) => {
    let menu_items = await MenuItem.find();
    console.log(menu_items);
    res.send(menu_items);
});

router.get("/:id", async (req, res) => {
    try{
        let menu_item = await MenuItem.findById(req.params.id);
        if (!menu_item)
            return res.status(400).send("Item does not exist.")
        res.send(menu_item);
    }
    catch (err) {
        return res.status(400).send("Invalid ID")
    }
});

router.post("/", async (req, res) => {
    let menu_item = new MenuItem(req.body);
    await menu_item.save();
    res.send(menu_item);
});

router.put("/:id", async (req, res) => {
    const menu_item = await MenuItem.findById(req.params.id);
    menu_item.name = req.body.name;
    menu_item.description = req.body.description;
    menu_item.price = req.body.price;
    menu_item.category = req.body.category;
    await menu_item.save();
    res.send(menu_item);
});

router.delete("/:id", async (req, res) => {
    const menu_item = await MenuItem.findByIdAndDelete(req.params.id);
    res.send(menu_item);
});

module.exports = router;