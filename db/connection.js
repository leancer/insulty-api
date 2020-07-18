const mongoose = require("mongoose");

mongoose.connect(process.env.MONGOURI,{useNewUrlParser:true,useUnifiedTopology:true},(err) => {

    console.log("database Connected")
});