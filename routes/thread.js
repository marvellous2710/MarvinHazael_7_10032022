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
router.put("/:threadId", (req, res, next) => {

  
  const mysql = 'UPDATE thread SET `titre` = ?, `text` = ? WHERE idthread = ?';
  const user = req.body; 
  const threadId = req.params.threadId;
  const data = [user.titre, user.text, threadId];

    
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
router.get("/:threadId", (req, res, next) => {
  
  const mysql = 'SELECT * FROM thread WHERE idthread = ?';

  const threadId = req.params.threadId;

  db.query(
    mysql, [threadId],
  (err, result) => {
    if (err) {
      throw err;
      return res.status(500).send({
        message: err,
      });
    }
    console.log(result);
    if (result.length === 0) {
      return res.status(404).send({
        message : `thread not found ${threadId}`
      });
    }
    return res.status(201).send(result[0]);
   }
  );
});


//find all thread
router.get("/", (req, res, next) => {
  const mysql = 'SELECT * FROM thread';

  // const user = req.body; 
  // const data = [user.idthread];

  console.log('toto');

  db.query(
      mysql,
    (err, result) => {
      if (err) {
        // throw err;
        return res.status(400).send({
          message: err,
        });
      }
      console.log(result);
      return res.status(201).send(result)   
    }
  );
  return res.status(201);
});


// //like
// router.post("/:id/like", (req, res, next) => {});


module.exports = router;

