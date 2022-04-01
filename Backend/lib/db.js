const mysql   = require('mysql');

const connection = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    database : "dbutilisateur",
    password : "root",
});


//open the MySQL connection
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});



module.exports = connection;
