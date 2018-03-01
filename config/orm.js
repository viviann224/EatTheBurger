// Import MySQL connection
var connection = require("../config/connection.js");
//orm class to create the methods that will execute the necessary MySQL 
//commands in the controllers
//functions will allow the user to retrieve and store data in the database

var orm = 
{
	//display all
	selectAll: function(tableInput/* , once we have output cb*/)
	{
		console.log("inside fx");
		var queryString = "SELECT * FROM " + tableInput + ";";
    	connection.query(queryString, function(err, result) 
    	{
	      if (err) 
	      {  throw err;}
	  	console.log(result);// for testing delete later
	      //cb(result); 	//needed turn out once we have output
    	});
	}, 

	  printQuestionMarks:function(num) 
	  {
	  var arr = [];

	  for (var i = 0; i < num; i++) {
	    arr.push("?");
	  }

	  return arr.toString();
	},

	//STARTING on INSERTONE FX
	//function insert one creates a new burger
	insertOne: function(table, cols, vals/* , once we have output cb*/) 
	{
		console.log(vals.length);
		//var stringme=printQuestionMarks(vals.length);
		//console.log(stringme);
		console.log("inside fx");
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += orm.printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }
      console.log("inside the fx");
      console.log(result);
      //cb(result); 	//needed turn out once we have output
    });
  },

// updateOne()

};

orm.insertOne("burgers","burger_name", ["secret Burger"]);
var value="secret burger";
//console.log(orm.printQuestionMarks(13));
