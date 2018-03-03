//Import orm.js into burger.js
var orm = require("../config/orm.js");
//ORM functions using burger specific input to update the database 
//via sql function calls
var burger =
{
	//callback function which displays the whole burgers table 
	all:function(cb)
	{
		orm.selectAll("burgers", function(res) 
		{
      		cb(res);
		});
	},
   //callback function which creates a new (new burger) input in the table
  create: function(cols, vals, cb) 
  {
    orm.insertOne("burgers", cols, vals, function(res) 
    {
      cb(res);
    });
  },
  //callback function which updates the eaten state of the burger
  update: function(objColVals, condition, cb) 
  {
    orm.updateOne("burgers", objColVals, condition, function(res) 
    {
      cb(res);
    });
  },
};
// Export at the end of the burger.js file
module.exports = burger;

