const mongoose = require("mongoose");

const menuItemSchema = mongoose.Schema({
  name: {
     type: String,
     required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});

const MenuItem = mongoose.model("menu_item", menuItemSchema,"Items");

module.exports = MenuItem;
