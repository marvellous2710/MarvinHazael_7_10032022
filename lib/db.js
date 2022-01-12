const mysql   = require('mysql');
const express = require('express');
const app     = express();
const userRoutes = require('../routes/router');
const cors    = require('cors');

const connection = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    database : "dbutilisateur",
    password : "root",
});


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//open the MySQL connection
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
  });

//Security
app.use(cors());
app.use(express.json());

//Routes
//app.use("/api/login", userRoutes.login);


module.exports = connection;
module.exports = app;