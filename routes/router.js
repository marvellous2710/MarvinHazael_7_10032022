const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
const userMiddleware = require("../middleware/users.js");


// http://localhost:4000/api/sign-up
router.post("/sign-up", userMiddleware.validateRegister, (req, res, next) => {

  const user = ({ email: req.body.email });
  const mysql = `SELECT idtableUser FROM tableUser WHERE LOWER(email) = LOWER ?`;
  //on compare si l'utilisateur existe avant de l'enregistrer
  db.query(
    mysql, user,
    (err, result) => {
      if (result && result.length) {
        return res.status(409).send({
          message: "This email is already in use !",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              message: err,
            });
          } else {
            //   const user = ` INSERT INTO tableUser (email, password) VALUES ('${(req.body.email)}', '${hash}'); ` ;
            const user = ({ email: req.body.email, password: hash });
            const mysql = ` INSERT INTO tableUser SET ? `;

            db.query(
              mysql,
              user,
              (err, result) => {
                if (err) {
                  throw err;
                  return res.status(400).send({
                    message: err,
                  });
                }
                return res.status(201).send({
                  message: "Registred !",
                });
              }
            );
          }
        });
      }
    }
  );
});


// http://localhost:4000/api/login
router.post("/login", (req, res, next) => {

  const user = ({ email: req.body.email });
  //const userLogged = `SELECT * FROM tableUser WHERE email = ('${(req.body.email)}');`;
  const mysql = `SELECT * FROM tableUser WHERE ?`;

  db.query(
    mysql, user,
    (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({
          message: err,
        });
      }
      if (!result.length) {
        return res.status(400).send({
          message: "Email or password incorrect !",
        });
      }

      bcrypt.compare(
        req.body.password,
        result[0]["password"],
        (bErr, bResult) => {
          if (bErr) {
            throw bErr;
            return res.status(400).send({
              message: "Email or password incorrect !",
            });
          }
          if (bResult) {
            //password match
            const token = jwt.sign(
              {
                email: result[0].username,
                idtableUser: result[0].idtableUser,
              },
              "SECRETKEY",
              { expiresIn: "7d" }
            );
            // db.query(
            //   //`UPDATE tableUser SET last_login = now () WHERE id = ${result[0].id};`
            //   `UPDATE tableUser SET last_login = now () WHERE email = ${result[0].email};`
            // );
            return res.status(200).send({
              message: "Logged in MOTHER FUCKEEEER ! ",
              token,
              //   user: result[0],
              email: result[0],
            });
          }
          return res.status(401).send({
            message: "Username or password incorrect !",
          });
        }
      );
    }
  );
});

// http://localhost:4000/api/secret-route
router.post("secret-route", (req, res, next) => { });


module.exports = router;