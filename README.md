# P7 Groupomania

Cloner ce git : https://github.com/marvellous2710/P7new.git



## FRONTEND :

- Installer NodeJS, VueJS, Bootstrap, Moment

- Pour lancer le Frontend : installer "yarn" puis " yarn serve " dans la console depuis le dossier Frontend



## BACKEND : 

- Installer dans le dossier backend les modules suivant : mySQL, express, jsonwebtoken, dotenv, cors, bcrypt, multer, nodemon

- Créer une base de donnée mySQL avec les tables et colonnes suivantes :
users: idUser, name, firstname, email, password, roleUserID
typeUser: idtypeUser, label(1:admin, 2:user, 3:disconnect)
typeMessage: idtypeMessage, label(1: text, 2: image)
thread: idthread, userId, titre, datePost, idCategory, content, typeMessage
likeDislike: idlike, idUser, idThread
comment: idComment, userId, titre, datePost, content, idThread
commentLike: idCommentLike, idUser, idComment
categories: idcategories, label(General, Sport, Musique, Jeux, Livre, Film)

- Créer un fichier " .env " pour y renseigner votre Token de validation comme dans " .env.dist "

- Démarrer " nodemon serve " depuis le dossier Backend sur un autre terminal
