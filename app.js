var express = require('express');
var bodyparser = require('body-parser')
 
const router = require('./routes')

var app = express()
app.set('view engine','ejs');
app.use(bodyparser.urlencoded({extended : false}))


// Routing...
app.use(router)

app.listen(3000, () => {
    console.log(`Running on port ${3000}`)
});
