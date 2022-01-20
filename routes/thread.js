const express = require("express");
const router  = express.Router();
const db      = require("../lib/db");

//add thread
router.post("/addthread", (req, res, next) => {
    const mysql = `INSERT INTO thread SET ?`;
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
});


//edit thread
router.put("/editthread", (req, res, next) => {

    //si pas d'id ça marche quand meme sur postman mais pas dans mysql

    const mysql = 'UPDATE thread SET `titre` = ?, `text` = ? WHERE idthread = ?';
    const user = req.body; 
    const data = [user.titre, user.text, user.idthread];
    
    db.query(
        mysql, data,
      (err, result) => {
        if (err) {
          throw err;
          return res.status(400).send({
            message: err,
          });
        }
        return res.status(201).send({ 
          message: "Thread modified !",
        });
      }
    );
});


//delete thread
router.delete("/delete", (req, res, next) => {
    // const mysql = `DELETE FROM thread WHERE idthread = ?`;
    const thread = ({ idthread: req.body.idthread });
    const mysql = 'DELETE FROM thread WHERE idthread = ?';

    const user = req.body; 
    const data = [user.idthread];
    
    db.query(
        mysql, data,
      (err, result) => {
        if (err) {
          throw err;
          return res.status(400).send({
            message: err,
          });
        }
        return res.status(201).send({ 
          message: "Thread deleted !",
        });
      }
    );
});


//find one thread
router.get("/:id", (req, res, next) => {});


//find all thread
router.get("/allthread", (req, res, next) => {
  const mysql = 'SELECT * FROM thread ';

  // const user = req.body; 
  // const data = [user.idthread];
  
  db.query(
      mysql,
    (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({
          message: err,
        });
      }
      return res.status(201).send(result)   
    }
  );
});


//like
router.post("/:id/like", (req, res, next) => {});


module.exports = router;

