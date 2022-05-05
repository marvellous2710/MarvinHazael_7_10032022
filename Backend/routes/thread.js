const express    = require("express");
const router     = express.Router();
const auth       = require('../middleware/auth');
const multer     = require('../middleware/multer-config');
const threadCtrl = require('../controllers/thread');


//THREAD
router.post("/", auth, multer,threadCtrl.createThread);
router.get("/", auth, threadCtrl.getAllThread);
router.get("/:threadId", auth,  threadCtrl.getOneThread);
router.put("/:threadId", threadCtrl.modifyThread);
router.delete("/:threadId", threadCtrl.deleteThread);

//LIKE

router.post("/:threadId/like", auth, threadCtrl.likeDislike);



//COMMENT
router.post("/comment/:threadId", auth, multer,threadCtrl.createComment);
router.get("/comments/:threadId", auth, multer,threadCtrl.getAllComment);
router.post("/:threadId/commentLike", auth, threadCtrl.commentLike);



module.exports = router;
