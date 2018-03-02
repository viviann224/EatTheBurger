// Express
// burger.js
//Create the router for the app, and export the router at the end of your file.
// Inside the burgers_controller.js file, import the following:

// Express
// burger.js
var express = require("express");
var burger = require("../models/burger.js");
var router = express.Router();

//creates an instance of the route and spits back an object
//router does not need as much functionality as app
router.get("/", function(req, res) 
	{
	  burger.all(function(data) 
	  {
	    var hbsObject = 
	    {
	      burger: data
	    };
	    console.log(hbsObject);
	    res.render("index", hbsObject);
	  });
});

router.post("/api/burgers", function(req, res) 
{
  burger.create(
  	["burger_name", "devoured"], 
  	[req.body.burger_name, req.body.devoured], 
  	function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});
// Export routes for server.js to use.
module.exports = router;