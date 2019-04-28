var router = require('express').Router();
var postController = require('../controllers/postController');

router.get("/", postController.get);
router.get("/:postId", postController.getOne);

module.exports = router;