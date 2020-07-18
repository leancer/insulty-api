const mongoose = require("mongoose");

const insultSchema = new mongoose.Schema({
    insult:String,
    lang:String
});


module.exports = Insult = mongoose.model("insult",insultSchema);