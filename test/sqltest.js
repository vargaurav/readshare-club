var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'readshare'
});
 
connection.connect();
 
connection.query('SELECT * from test', function (error, results, fields) {
    //console.log(error);
    console.log('The solution is: ', results);
});
 
connection.end();