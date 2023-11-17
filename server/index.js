const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");
var connectionString =
  "postgres://qdfckrgc:VCvMLpKDYHGrCcS1bT61x4SS8Y1RiFzB@surus.db.elephantsql.com/qdfckrgc";
var pg = require("pg");
var client = new pg.Client(connectionString);
require("dotenv").config();

app.use(express.json());
app.use(cors());

client.connect(function (err) {
  if (err) {
    return console.error("could not connect to postgres", err);
  }
  client.query('SELECT NOW() AS "theTime"', function (err, result) {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("connected");
  });
});

app.post("/register", (req, res) => {
  const { username, password, email } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    client.query(
      "SELECT username FROM Users where username=$1",
      [username],
      (err, result) => {
        if (!result.rows[0]) {
          client.query(
            "INSERT INTO Users (username,password,email) VALUES ($1,$2,$3)",
            [username, hash, email],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                res.json({ com: "register went successfuly" });
              }
            }
          );
        } else if (err) {
          res.status(400).json({ error: err });
        } else {
          res.json({ com: "user exists" });
        }
      }
    );
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  client.query(
    "SELECT * FROM Users where username=$1",
    [username],
    (err, result) => {
      if (result.rows[0]) {
        bcrypt.compare(password, result.rows[0].password, (err, response) => {
          if (response) {
            const accessToken = sign(
              { username: username, id: result.rows[0].id },
              "loginSecret"
            );
            res
              .status(200)
              .json({ accessToken: accessToken, username: username });
          } else {
            res.status(400).json({
              error:
                "Wrong username or password. Check your combination and try again.",
            });
          }
        });
      } else {
        res.status(400).json({ error: "User doesn't exists" });
      }
    }
  );
});

app.post("/add", (req, res) => {
  const { username, title, description, date } = req.body;
  console.log(req.body);
  client.query(
    "INSERT INTO Notes(username,title,description,date) VALUES ($1,$2,$3,$4)",
    [username, title, description, date],
    (err, result) => {
      if (err) {
        res.status(400).json({ com: "Failed to insert data" });
      } else {
        res.status(200).json({ com: "Note inserted" });
      }
    }
  );
});

app.post("/notes", (req, res) => {
  const { username } = req.body;

  client.query(
    "SELECT * FROM Notes where username=$1",
    [username],
    (err, result) => {
      if (err) {
        res.status(400).json({ error: err });
      } else {
        res.status(200).json(result);
      }
    }
  );
});

app.post("/deleteNote", (req, res) => {
  const { username, title } = req.body;

  client.query(
    "DELETE FROM Notes WHERE username=$1 AND title=$2",
    [username, title],
    (err, result) => {
      if (err) {
        res.status(400).json({ error: err });
      } else {
        res.status(200).json({ com: "Note deleted" });
      }
    }
  );
});

app.post("/completed", (req, res) => {
  const { username, title, description, date } = req.body;

  client.query("DELETE FROM Notes WHERE username=$1 AND title=$2", [
    username,
    title,
  ]);

  client.query(
    "INSERT INTO Completed(username,title,description,date) VALUES ($1,$2,$3,$4)",
    [username, title, description, date],
    (err, result) => {
      if (err) {
        res.status(400).json({ error: err });
      } else {
        res.status(200).json({ com: "Note added to Completed" });
      }
    }
  );
});

app.post("/completedAll", (req, res) => {
  const { username } = req.body;

  client.query(
    "SELECT * FROM Completed WHERE username=$1",
    [username],
    (err, result) => {
      if (err) {
        res.status(400).json({ error: err });
      } else {
        res.status(200).json(result);
      }
    }
  );
});

app.post("/restore", (req, res) => {
  const { username, title, description, date } = req.body;

  client.query("DELETE FROM Completed WHERE username=$1 AND title=$2", [
    username,
    title,
  ]);

  client.query(
    "INSERT INTO Notes(username,title,description,date) VALUES ($1,$2,$3,$4)",
    [username, title, description, date],
    (err, result) => {
      if (err) {
        res.status(400).json({ error: err });
      } else {
        res.status(200).json(result);
      }
    }
  );
});

app.listen(process.env.PORT || 3002, function () {
  console.log("connected 3002");
});
