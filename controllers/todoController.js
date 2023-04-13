var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//Connect to Database
mongoose.connect(
  "mongodb+srv://raj:raj@todo.ocw5yya.mongodb.net/?retryWrites=true&w=majority"
);

// Create a schema (like a blueprint)
var todoSchema = new mongoose.Schema({
  item: String,
});

// Creating a Model in the database
var Todo = mongoose.model("Todo", todoSchema);

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {
  // Get data from mongoDB & pas it to the view
  app.get("/todo", function (req, res) {
    Todo.find({})
      .then(function (data) {
        res.render("todo", { todos: data });
      })
      .catch(function (err) {
        throw err;
      });
  });

  app.post("/todo", urlencodedParser, function (req, res) {
    // Get data from view & pas it to the mongoDB
    var newTodo = Todo(req.body)
      .save()
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        throw err;
      });
  });

  app.delete("/todo/:item", function (req, res) {
    // Delete the requested data from the mongoDB
    Todo.find({ item: req.params.item.replace(/\-/g, " ") }).deleteMany()
    .then(function(data) {
      res.json(data);
    })
  });
};