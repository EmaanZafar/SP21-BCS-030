const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
  //console.log(req.session.user);
    res.render("index",{user: req.session.user});
  })


module.exports = router;

