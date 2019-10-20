const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let TodoSchema = new Schema({
  _id: Schema.Types.ObjectId,
  text: String,
  completed: Boolean,
  dueTime: Date
});
module.exports = mongoose.model("Todo", TodoSchema);
