const mongoose = require("mongoose");

const insultSchema = new mongoose.Schema({
    insult:String,
    lang:String
});

insultSchema.statics.random = async function(lang){
    const count = await this.countDocuments({lang});
    const random = Math.floor(Math.random() * count);
    let all = this.find({lang});
    return all.findOne().skip(random);
}


module.exports = Insult = mongoose.model("insult",insultSchema);