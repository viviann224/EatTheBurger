//setting up MySQL connection
var mysql = require("mysql");

var connection = mysql.createConnection({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "root",
  database: "burgers_db"
});

// Make connection.
connection.connect(function(err) {
  if (err) {//if error, display error
    console.error("error connecting: " + err.stack);
    return;
  }//else tell user the connection id
  console.log("connected as id " + connection.threadId);
});

// Exporting connection for ORM usage
module.exports = connection;