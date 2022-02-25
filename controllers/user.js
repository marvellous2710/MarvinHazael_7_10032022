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
          // throw err;
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
              // throw bErr;
              return res.status(400).send({
                message: "Email or password incorrect !",
              });
            }
            if (bResult) {
        

                const token = jwt.sign({
                    email: result[0].username,
                    idtableUser: result[0].idtableUser,
                  },
                  "SECRETKEY",
                  { expiresIn: "7d" }
                );
                return res.status(200).send({
                  message: "Logged ! ",
                  token,      
                  user: result[0],
              
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


exports.modifyUser = (req, res, next) => {
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
}

exports.deleteUser = (req, res, next) => {
  // faire attention à ne pas supprimer totalement le user pour ne pas supprimer tous ses commentaires sur lesquelles des réactions ont été générées
//supprimer que la photo par exemple
//faire en sorte qu'il ne puisse plus se logger mais que son compte existe toujours comme sur OC
}

exports.allUser = (req, res, next) => {
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
}

exports.oneUser= (req, res, next) => {}