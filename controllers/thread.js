const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../lib/db");

exports.createThread = (req, res, next) => {
  const mysql = `INSERT INTO thread SET ?`;

  //condition ternaire comme if else
  const thread = req.file
    ? {
        titre: req.body.titre,
        text: req.body.text,
        email: req.body.email,
        image: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : {
        titre: req.body.titre,
        text: req.body.text,
        email: req.body.email,
      };

  db.query(mysql, thread, (err, result) => {
    if (err) {
      throw err;
      return res.status(400).send({
        message: err,
      });
    }
    return res.status(201).send({
      message: "Thread registred !",
    });
  });
};

exports.getAllThread = (req, res, next) => {
  const size = req.query.size;
  const pageNumber = req.query.page;
  const offset = (pageNumber - 1) * size;

  const mysql = `SELECT * FROM thread ORDER BY datePost DESC LIMIT ${size} OFFSET ${offset}`; //DESC pour afficher les thread par le dernier posté
  //const mysql = `SELECT * FROM thread `;

  db.query(mysql, (err, result) => {
    if (err) {
      return res.status(400).send({
        message: err,
      });
    }
    return res.status(201).send(result);
  });
  return res.status(201);
};

exports.getOneThread = (req, res, next) => {
  const mysql = "SELECT * FROM thread WHERE idthread = ?";
  const threadId = req.params.threadId;

  db.query(mysql, [threadId], (err, result) => {
    if (err) {
      throw err;
      return res.status(500).send({
        message: err,
      });
    }
    console.log(result);
    if (result.length === 0) {
      return res.status(404).send({
        message: `Thread not found ${threadId}`,
      });
    }
    return res.status(201).send(result[0]);
  });
};

exports.modifyThread = (req, res, next) => {
  const mysql    = "UPDATE thread SET titre = ? WHERE idthread = ?";
  const titre    = req.body.titre;
  const threadId = req.params.threadId;

  db.query(mysql, [titre, threadId], (err, result) => {
    if (err) {
      throw err;
      return res.status(400).send({
        message: err,
      });
    }
    return res.status(201).send({
      message: "Thread modified !",
    });
  });
};


exports.deleteThread = (req, res, next) => {
  const mysql    = "DELETE FROM thread WHERE idthread = ?";
  const threadId = req.params.threadId;

  db.query(mysql, [threadId], (err, result) => {
    if (err) {
      throw err;
      return res.status(400).send({
        message: err,
      });
    }
    return res.status(201).send({
      message: "Thread deleted !",
    });
  });
};

exports.likeDislike = (req, res, next) => {};
