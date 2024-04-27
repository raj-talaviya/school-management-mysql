var express = require('express');
var bodyparser = require('body-parser')
var mysql = require('mysql');
 
const router = require('./routes')

var app = express()
app.set('view engine','ejs');
app.use(bodyparser.urlencoded({extended : false}))

var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"sr-to-do-list"
}) 

con.connect();

//School Login
app.get('/',function(req,res){
    res.render("school_login");
})

// Routing...
app.use(router)

app.listen(3000, () => {
    console.log(`Running on port ${3000}`)
});
