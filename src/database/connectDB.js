const MongoClient = require("mongodb").MongoClient;
const DB_NAME = "retail";

// Connection URL
async function connectDB() {
  const url = "mongodb://localhost:27017/";
  const client = new MongoClient(url);
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const database = client.db(DB_NAME);
    return database;
  } catch (err) {
    console.log(err.stack);
  }
}

module.exports = connectDB;
