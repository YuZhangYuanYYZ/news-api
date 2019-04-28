const Post = require('../models/Post');

const get = function (req, res, next) {
    const postOptions = {
        title: "Media executive David Evans sells sprawling Toorak mansion",
        excerpt: "<p class=\"standfirst-content\">Prominent media executive David Evans’ lavish Toorak property with 1930s mansion, swimming pool and tennis court has been snapped up in a sale of more than $11 million.</p>",
        author: "Tessa Hayward",
    }
    const post = new Post(postOptions);
    res.json([post])
};


const getOne = function (req, res, next) {
    console.log("get one ")
    next();
};

module.exports = {
    get: get,
    getOne,
}