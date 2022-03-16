const express        = require("express");
const userMiddleware = require("../middleware/users");
const userCtrl       = require('../controllers/user');
const router         = express.Router();



router.post('/login', userCtrl.login);

router.post('/signup', userCtrl.signup, userMiddleware.validateRegister);

router.put("/", userCtrl.modifyUser);

router.put("/:threadId", userCtrl.modifyPassword);

router.delete("/:id", userCtrl.deleteUser);

router.get("/alluser", userCtrl.allUser);




module.exports = router;
