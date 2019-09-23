const router = require("express").Router();
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

// api router will mount other routers
// for all our resources
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);

module.exports = router;
