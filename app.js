var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

app.set('view engine', 'ejs');

app.use(express.static('./public'));

// FORE CONTROLLERS
todoController(app);

app.listen('3000');
console.log("listening to 3000 port");