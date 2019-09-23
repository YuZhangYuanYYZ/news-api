const connectDB = require("../../database/connectDB");
const Post = require("../models/Post");

const getDBCollection = async () => {
  const database = await connectDB();
  const collection = database.collection("inventory");
  return collection;
};

const postService = {
  getAllPosts: async () => {
    const collection = await getDBCollection();
    const documents = await collection.find({}).toArray();
    console.log(documents.length);

    const postOptions = {
      title: "Media executive David Evans sells sprawling Toorak mansion",
      excerpt:
        '<p class="standfirst-content">Prominent media executive David Evans’ lavish Toorak property with 1930s mansion, swimming pool and tennis court has been snapped up in a sale of more than $11 million.</p>',
      author: "Tessa Hayward"
    };
    const post = new Post(postOptions);
    return documents;
  },

  getOne: async () => {
    const collection = await getDBCollection();
    const documents = await collection
      .find({})
      .limit(1)
      .toArray();
    return documents;
  }
};

module.exports = postService;
