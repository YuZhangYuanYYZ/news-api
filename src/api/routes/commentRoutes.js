var router = require('express').Router();

router.get("/", (req, res, next) => {
    res.send('Get All Comments!');
});

router.get("/:id", (req, res, next) => {
    const commentId = req.params.id;
    const comment = {
        id: commentId,
        desc: "you are awesome"
    }
    res.json(comment);
});

router.put("/:id", (req, res, next) => {
    const commentId = req.params.id;
    const comment = {
        id: commentId,
        desc: "you have been changed"
    }
    res.json(comment);
});

router.post("/", (req, res, next) => {
    res.json({
        id: 1
    });
});

module.exports = router;