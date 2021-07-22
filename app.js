const express = require("express");
const app = express();
const port = 5000;

const mysql = require("mysql2");
// const connection = require("./config");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ElonMusknumero1!",
  database: "giftify",
});

app.use(express.json());

//get all friends
app.get("/api", (req, res) => {
  connection.query("SELECT * FROM friend", (err, results) => {
    if (err) {
      res.status(500).send(`An error occurred: ${err.message}`);
    } else {
      res.json(results);
    }
  });
  // connection.connect((err) => {
  //   if (err) throw err;
  //   console.log("Connected to MySQL Server!");
  // });
});
let friendId = "";
//get all gift for a specific friend
app.get("/gift-manager/:id", (req, res) => {
  const friendName = req.params.id;
  connection.query(
    "SELECT * FROM friend WHERE name = ?",
    [friendName],
    (err, results) => {
      if (err) {
        res.status(500).send(`An error occurred: ${err.message}`);
      } else {
        friendId = results[0].id;
        connection.query(
          "SELECT * FROM gift WHERE friend_id = ?",
          [friendId],
          (err, results) => {
            if (err) {
              res.status(500).send(`An error occurred: ${err.message}`);
            } else {
              res.json(results);
            }
          }
        );
      }
    }
  );
});

//post a new friend
app.post("/add-friend", (req, res) => {
  const { name, picture, user_id } = req.body;
  connection.query(
    "INSERT INTO friend (name, picture, user_id) VALUES (?, ?, ?)",
    [name, picture, user_id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error saving the user");
      } else {
        const id = result.insertId;
        const createdUser = { id, name, picture, user_id };
        res.status(201).json(createdUser);
      }
    }
  );
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Server!");
});

app.listen(port, () => {
  console.log(`Server is running at port:${port}`);
});
