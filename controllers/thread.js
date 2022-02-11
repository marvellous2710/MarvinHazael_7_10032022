const bcrypt  = require("bcryptjs");
const jwt     = require("jsonwebtoken");
const db      = require("../lib/db");

exports.createThread = (req, res, next) => {
    const mysql  = `INSERT INTO thread SET ?`;
    const thread = ({ titre: req.body.titre, text: req.body.text });
    
    db.query(
        mysql, thread,
      (err, result) => {
        if (err) {
          throw err;
          return res.status(400).send({
            message: err,
          });
        }
        return res.status(201).send({ 
          message: "Thread registred !",
        });
      }
    );
}