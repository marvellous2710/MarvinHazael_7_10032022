const express    = require("express");
const router     = express.Router();
const auth       = require('../middleware/auth');
const multer     = require('../middleware/multer-config');
const threadCtrl = require('../controllers/thread');



router.post("/", auth, multer,threadCtrl.createThread);

router.get("/", auth, threadCtrl.getAllThread);

router.get("/:threadId", auth,  threadCtrl.getOneThread);

//router.get("/category", threadCtrl.getCategory);

//router.get("/liked/:threadId", threadCtrl.getLiked);

router.get("/countLike/:threadId", threadCtrl.getCountLike);

router.put("/:threadId", threadCtrl.modifyThread);

router.delete("/:threadId", threadCtrl.deleteThread);

//router.post("/:threadId/like", auth, threadCtrl.likeDislike);

router.post("/:threadId/like", auth, threadCtrl.likeDislike);

router.get("/:threadId/liked", auth, threadCtrl.getLiked);



router.post("/comment/:threadId", auth, multer,threadCtrl.createComment);

router.get("/comments/:threadId", auth, multer,threadCtrl.getAllComment);


module.exports = router;
