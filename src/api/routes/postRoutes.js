var router = require("express").Router();
const postController = require("../controllers/postController");

router.get("/", postController.getAll);
router.get("/:postId", postController.getOne);

module.exports = router;
