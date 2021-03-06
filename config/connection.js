//setting up MySQL connection
var mysql = require("mysql");
//var connection = mysql.createConnection(process.env.JAWSDB_URL);  //code for heroku
var connection;

if(process.env.JAWSDB_URL)  //if heroku is deployed check the JAWS database
{
    connection = mysql.createConnection(process.env.JAWSDB_URL) //run JAWS
}
else{
    connection = mysql.createConnection({ //else use local host
      //port:3306
        host : "localhost",
        user : "root",
        password : "root",
        database : "burgers_db"
    });

}

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