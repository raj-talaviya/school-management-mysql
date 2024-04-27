const mysql = require('mysql');


const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"sr-to-do-list"
}) 

db.connect();

module.exports = db