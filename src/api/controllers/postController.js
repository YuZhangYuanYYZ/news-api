const postService = require("../services/postService");

const getAll = async function(req, res, next) {
  const posts = await postService.getAllPosts();
  res.json(posts);
};

const getOne = async function(req, res, next) {
  const post = await postService.getOne();
  res.json(post);
};

module.exports = {
  getAll: getAll,
  getOne
};
