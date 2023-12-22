const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
  //console.log(req.session.user);
    res.render("index",{user: req.session.user});
  })

router.get('/calculate',(req,res)=>{
  // Retrieve the previous calculation results from the session, or initialize an empty array
  const results = req.session.results || [];
  res.render("calculate",{layout: './null_layout',results, user: req.session.user});
});


router.post('/calculate',(req,res)=>{
  
  // Destructure operands and operation from the request body
  const operand1 = req.body.operand1;
  const operation = req.body.operation;
  const operand2 = req.body.operand2;

  // Perform the calculation based on the selected operation
  let result;
  switch (operation) {
      case 'add':
          result = parseFloat(operand1) + parseFloat(operand2);
          break;
      case 'subtract':
          result = parseFloat(operand1) - parseFloat(operand2);
          break;
      case 'multiply':
          result = parseFloat(operand1) * parseFloat(operand2);
          break;
      case 'divide':
          result = parseFloat(operand1) / parseFloat(operand2);
          break;
      default:
          result = 'Invalid operation';
  }

   // Store the details of the current calculation in an object
  const calculation = { operand1, operand2, operation, result };

  if (!req.session.results) {
    req.session.results = [];
  }
  
  req.session.results.push(calculation);
  

  // Redirect back to the calculator page
  res.redirect('/calculate');

})


module.exports = router;

