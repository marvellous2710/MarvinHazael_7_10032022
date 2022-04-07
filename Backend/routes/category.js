const express = require("express");
const router  = express.Router();
const db      = require("../lib/db");

//get all categories
router.get("/", (req, res, next) => {
  const mysql = "SELECT * FROM categories";
  

  db.query(mysql, (err, result) => {
    if (err) {
      return res.status(400).send({
        message: err,
      });
    }
    return res.status(201).send(result);
  });
  return res.status(201);
});

// router.get("/countLike", (req, res, next) => {
//   const mysql = "SELECT * FROM likeDislike";

//   db.query(mysql, (err, result) => {
//     if (err) {
//       return res.status(400).send({
//         message: err,
//       });
//     }
//     return res.status(201).send(result);
//   });
//   return res.status(201);
// });


router.get("/countLike", (req, res, next) => {
  //il faut savoir combien il y a de like sur CE thread !

  const mysql    = "SELECT COUNT(*) FROM likeDislike WHERE idThread = ? ";
  const threadId = req.params.threadId;

  db.query(mysql, [threadId], (err, result) => {
    if (err) {
      throw err;
      return res.status(400).send({
        message : err,
      });
    }
    return res.status(400).send({
      message : "voici le nombre de like !",
    });
  });
});






module.exports = router;
