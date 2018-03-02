// Import MySQL connection
var connection = require("../config/connection.js");
//orm class to create the methods that will execute the necessary MySQL 
//commands in the controllers
//functions will allow the user to retrieve and store data in the database

var orm = 
{
	//display all
	selectAll: function(tableInput , cb)
	{
		console.log("inside selectall fx");
		var queryString = "SELECT * FROM " + tableInput + ";";
    	connection.query(queryString, function(err, result) 
    	{
	      if (err) 
	      {  throw err;}
	  	console.log(result);// for testing delete later
	      cb(result); 	//needed turn out once we have output
    	});
    	console.log("finished selectall fx");
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
	//help function where for every string input there is a ? created for each one
	insertOne: function(table, cols, vals , cb) 
	{
		//console.log(vals.length);
		//var stringme=printQuestionMarks(vals.length);
		//console.log(stringme);
		//console.log("inside fx");
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
      console.log("insertOne complete the fx");
      //console.log(result);
      cb(result);
    });
  },

  // Helper function to convert object value to SQL syntax
objToSql:function(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
},

//DISPLAY: UPDATE cats SET sleepy=false WHERE id = 2
// updateOne()

updateOne: function(table, objColVals, condition/* , once we have output cb*/) {
   /*
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += orm.objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) 
      {   throw err;}
      //cb(result); 	//needed turn out once we have output
    });*/
  },

};
//console.log(burgers);
//orm.updateOne("burgers",burgers.devoured, ["secret Burger"]);
//var value="secret burger";
//console.log(orm.printQuestionMarks(13));

//Export the ORM object in module.exports.
module.exports = orm;


