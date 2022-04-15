//const { faS } = require("@fortawesome/free-solid-svg-icons");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../lib/db");


exports.getLiked = (req, res, next) => {
  const idUser   = req.body.idUser;
  const idThread = req.body.idThread;


  const user = ({ idUser: req.body.idUser, idThread: req.body.idThread });
  const mysql = `SELECT * FROM likeDislike WHERE idUser = ${idUser} AND idThread = ${idThread}`;
  console.log(idThread);

  db.query(
    mysql, user, 
    (err, result) => {
      
      // if (err) {
      //   throw err;
      //   return res.status(500).send({
      //     message: err,
      //   });
      // }
      
      // if (result && result.length) {
      //   return res.status(404).send({
      //     message: "already liked !",
      //   });
      // }
      // return res.status(201).send(result);


      if (result && result.length) {
        return res.status(201).send({
          message: "already liked !",
        });
      }
      return res.status(500).send({
        message: err,
      });
  });
};



exports.likeDislike = (req, res, next) => {
//controler si le user a deja liké CE thread si oui supprimer le like sinon l'insérer
  const idUser   = req.body.idUser;
  const idThread = req.body.idThread;
  
  const user = ({ idUser: req.body.idUser, idThread: req.body.idThread });
  const mysql = `SELECT * FROM likeDislike WHERE idUser = ${idUser} AND idThread = ${idThread}`;
  

  db.query(
    mysql, user,
    (err, result) => {
      if (result && result.length) {
        const mysql = `DELETE FROM likeDislike WHERE idUser = ${idUser} AND idThread = ${idThread}`;
        
      db.query(
        mysql, user,
        (err, result) => {
        if (err) {
          throw err;
          return res.status(400).send({
            message: err,
          });
        }
        return res.status(201).send({
          message: "like deleted !",
          
        });
    
      });
      } else {
        const mysql = `INSERT INTO likeDislike SET ?`;
        const user = ({ idUser: req.body.idUser, idThread: req.body.idThread });
      
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
              message: "liked !",
            });
          }
        );
      }
    }
  );
 
 
  // -------------------- CA MARCHE --------------------------
  // const mysql = `INSERT INTO likeDislike SET ?`;
  // const user = ({ idUser: req.body.idUser, idThread: req.body.idThread }); 
  
  

  // db.query(
  //   mysql,
  //   user,

  //   (err, result) => {
  //     if (err) {
  //       throw err;
  //       return res.status(400).send({
  //         message: err,
  //       });
  //     }
  //     return res.status(201).send({
  //       message: "liked !",
  //     });
  //   }
  // );
};

exports.createThread = (req, res, next) => {
  const mysql = `INSERT INTO thread SET ?`;

  //condition ternaire comme if else
  const thread = req.file
    ? {
        userId : req.body.userId,
        titre  : req.body.titre,
        text   : req.body.text,
        email  : req.body.email,
        image  : `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : {
        userId : req.body.userId,
        titre  : req.body.titre,
        text   : req.body.text,
        email  : req.body.email,
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
  const size       = req.query.size;
  const pageNumber = req.query.page;
  const offset     = (pageNumber - 1) * size;

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
  const mysql    = "SELECT * FROM thread WHERE idthread = ?";
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


exports.getCategory = (req, res, next) => {
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
};



exports.modifyThread = (req, res, next) => {
  const mysql = "UPDATE thread SET titre = ? WHERE idthread = ?";
  const titre = req.body.titre;
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
  const filename = threadId.imageUrl.split("/images/")[1];

  if (filename) {
    db.query(
      mysql,
      [threadId],
      fs.unlink(`images/${filename}`),
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
  } else {
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
  }

  // ---------------------CA MARCHE
  // db.query(mysql, [threadId], (err, result) => {
  //   if (err) {
  //     throw err;
  //     return res.status(400).send({
  //       message: err,
  //     });
  //   }
  //   return res.status(201).send({
  //     message: "Thread deleted !",
  //   });
  // });
  // ---------------------CA MARCHE
};



exports.getCountLike = (req, res, next) => {
  //il faut savoir combien il y a de like sur CE thread !
  
  const mysql    = "SELECT COUNT(*) FROM likeDislike WHERE idThread = ?";
  const threadId = req.params.threadId;

  db.query(mysql, [threadId], (err, result) => {
    if (err) {
      throw err;
      return res.status(400).send({
        message: err,
      });
    }

    return res.status(201).send(result);
   
  });
};

exports.getLiked = (req, res, next) => {
  //si userID déja présent dans la bdd sur CE thread alors liké sinon pas liké
  //méthode pour faire comprendre au front que l'utilisateur a deja liké
  const userId   = req.body.userId;
  //const idThread = req.params.idThread;

  //const user  = ({ idUser: req.body.userId, idThread: req.params.idThread });
  const user = ({ idUser : req.body.userId });
  // const mysql = `SELECT * FROM likeDislike WHERE idUser = '${userId}' AND '${idThread}`;
  const mysql = `SELECT * FROM likeDislike WHERE idUser = ${user} AND idThread = ?`;
  const threadId = req.params.threadId;

  db.query(
    mysql, [threadId], 
    (err, result) => {
      if (result && result.length) {
       
        return res.status(201).send(result[0]);
      } else {
        
        return res.status(401).send(false);
      }
    }
  )
};



exports.createComment = (req, res, next) => {
  const mysql = 'INSERT INTO comment SET ?';

  const comment = req.file
  ? {
      userId : req.body.userId,
      titre  : req.body.titre,
      text   : req.body.text,
      email  : req.body.email,
      idThread : req.body.idThread,
      image  : `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    }
  : {
      userId   : req.body.userId,
      titre    : req.body.titre,
      text     : req.body.text,
      email    : req.body.email,
      idThread : req.body.idThread,
    };

  db.query(mysql, comment, (err, result) => {
    if (err) {
      throw err;
      return res.status(400).send({
        message: err,
      });
    }
    return res.status(201).send({
      message: "comment registred"
    })
  })
};



exports.getAllComment = (req, res, next) => {
  const mysql    = "SELECT * FROM comment WHERE idthread = ?";
  const idThread = req.params.threadId;
 
  
  db.query(mysql, [idThread], (err, result) => {

    if (err) {
      return res.status(400).send({
        message: err,
      });
    }
    return res.status(201).send(result);
  });
  return res.status(201);

};

