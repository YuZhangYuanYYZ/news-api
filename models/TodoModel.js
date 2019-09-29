const mongoose = require('mongoose')
let Schema       = mongoose.Schema;
let TodoSchema   = new Schema({
    text: String,
    completed:Boolean,
    date:String
});
module.exports = mongoose.model('Todo', TodoSchema);