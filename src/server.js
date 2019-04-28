const apiRouter = require('./api/router');
const express = require('express');
const server = express();
var router = express.Router();

// this will only be invoked if the path starts with /bar from the mount point
router.use('/bar', function (req, res, next) {
    console.log('maybe some additional /bar logging');
    next();
});

// always invoked
apiRouter.use(function (req, res, next) {
    res.send('Hello World');
});


server.use('/api', apiRouter);

module.exports = server;