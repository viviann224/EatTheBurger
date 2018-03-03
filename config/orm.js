// Import MySQL connection
var connection = require("../config/connection.js");
//orm class contains methods that will run MySQL commands in the controllers
//allow the user to retrieve and store data in the database

var orm = 
{
	//display all in the database (the id, name, eaten state)
	selectAll: function(tableInput , cb)
	{
		var queryString = "SELECT * FROM " + tableInput + ";";
    	connection.query(queryString, function(err, result) 
    	{
	      if (err) 
	      {  throw err;}
	      cb(result); 	//callback to display on index via controller
    	});
	}, 
  //later use when user lists values, a "?" is asoociated to each value
  printQuestionMarks:function(num) 
  {
	  var arr = [];
	  //check the array for every item in each array go and get a "?"
	  for (var i = 0; i < num; i++) 
	  {
	    arr.push("?");
	  }
	  return arr.toString();
	},


	//insert function which inserts a new row (new burger) into the databae
	insertOne: function(table, cols, vals , cb) 
	{
	    var queryString = "INSERT INTO " + table;

	    queryString += " (";
	    queryString += cols.toString();
	    queryString += ") ";
	    queryString += "VALUES (";
	    queryString += orm.printQuestionMarks(vals.length);
	    queryString += ") ";

	    connection.query(queryString, vals, function(err, result) 
	    {
	      if (err) 
	      {    throw err; }
	      cb(result);	////callback to add to burger api via controller
	    });
  	},

  // Helper function to convert object value to SQL syntax
objToSql:function(ob) 
{
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) 
  {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) 
    {
      // if string with spaces, add quotations
      if (typeof value === "string" && value.indexOf(" ") >= 0) 
      {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }
  // translate array of strings to a single comma-separated string
  return arr.toString();
},
//update function finds the specific row and checks the devoured state and updates
updateOne: function(table, objColVals, condition , cb) {
   
    var queryString = "UPDATE " + table;
    queryString += " SET ";
    queryString += orm.objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function(err, result) {
      if (err) 
      {   throw err;}
      cb(result); 	//needed turn out once we have output
    });
  },
};
//Export the ORM object in module.exports.
module.exports = orm;