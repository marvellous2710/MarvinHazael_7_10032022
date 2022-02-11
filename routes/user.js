const express = require("express");
// const bcrypt  = require("bcryptjs");
// const jwt     = require("jsonwebtoken");
const db      = require("../lib/db");
const userMiddleware = require("../middleware/users");
const userCtrl = require('../controllers/user');
// const { validateRegister } = require("../middleware/users.js");

const router  = express.Router();


router.post('/signup', userCtrl.signup, userMiddleware.validateRegister);
router.post('/login', userCtrl.login);


// http://localhost:4000/api/:id update profile mysql node
// router.put("/edit", (req, res, next) => {
//   const mysql = 'UPDATE tableUser SET `name` = ? WHERE idtableUser = ?';
//   //const mysql = 'UPDATE tableUser SET `name` = ?, `firstname` = ?, `email` = ?, `password` = ? WHERE idtableUser = ?';
//   //const user = ({ email: req.body.email}); 
//   const user = req.body; 
//   const data = [user.name, userId/* id récup dans le token */];
  
//   db.query(
//     mysql, data,
//     (err, result) => {
//       if (err) {
//         throw err;
//         return res.status(400).send({
//           message: err,
//         });
//       } else {
//         return res.status(200).send({
//           message: "Updated successfully ! "
//         });
//       }
//     })
// });


router.put("/", (req, res, next) => {
  
  //si pas d'id ça marche quand meme sur postman mais pas dans mysql
  const mysql = 'UPDATE tableuser SET `name` = ?, `firstname` = ?,`profilepicture` = ?, `description`= ? WHERE idtableuser = ?';
  const user = req.body; 
  const data = [user.name, user.firstname, user.profilepicture, user.description, user.idtableUser];
       
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
        message: "Updated successfully !",
      });
    }
  );
});


//UPDATE tableuser SET `name` = 'Ouzoumaki' WHERE idtableuser = 43;MARCHE 
//UPDATE [table] SET champ=valeur, champ=valeur WHERE [conditions]


// http://localhost:4000/api/:id
router.delete("/:id", (req, res, next) => {
// faire attention à ne pas supprimer totalement le user pour ne pas supprimer tous ses commentaires sur lesquelles des réactions ont été générées
//supprimer que la photo par exemple
//faire en sorte qu'il ne puisse plus se logger mais que son compte existe toujours comme sur OC
});



//find  all users
router.get("/alluser", (req, res, next) => {

  const mysql = 'SELECT * FROM tableuser ';

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



module.exports = router;