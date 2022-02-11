const bcrypt  = require("bcryptjs");
const jwt     = require("jsonwebtoken");
const db      = require("../lib/db");



exports.login = (req, res, next) => {
    const user = ({ email: req.body.email});  
    const mysql = `SELECT * FROM tableUser WHERE ?`;
  
    db.query(
      mysql,user,
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
                return res.status(200).send({
                  message: "Logged ! ",
                  token,          
                  //email: result[0],
                  
                  
                });
              }
              return res.status(401).send({
                message: "Username or password incorrect !",
              });
            }
          );
        }
      );
};

exports.signup = (req, res, next) => {
    const user = ({ email: req.body.email });
    const mysql = `SELECT idtableUser FROM tableUser WHERE LOWER(email) = LOWER ?`;
  //on compare si l'utilisateur existe avant de l'enregistrer
  db.query(
    mysql,user,
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
            const user = ({ email: req.body.email, password: hash });
            const mysql = `INSERT INTO tableUser SET ?`;
      
            db.query(
                mysql,
                user ,
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
}