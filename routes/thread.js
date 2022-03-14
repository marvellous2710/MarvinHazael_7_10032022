const express    = require("express");
const router     = express.Router();
const auth       = require('../middleware/auth');
const multer     = require('../middleware/multer-config');
const threadCtrl = require('../controllers/thread');

router.post("/", auth, multer,threadCtrl.createThread);


router.get("/", auth,  threadCtrl.getAllThread);

router.get("/:threadId", auth, threadCtrl.getOneThread);

router.put("/:threadId", threadCtrl.modifyThread);
router.delete("/", auth, threadCtrl.deleteThread);
router.post("/:id/like", auth, threadCtrl.likeDislike);


module.exports = router;
