const express = require("express");
const cors = require("cors");
require("./db/connection");

const app = express();


app.use(cors());
app.use(express.json({extended:true}));


app.get("/",(req,res) => {
    res.send("hello");
})

app.use("/insult",require('./routes/insult'));



module.exports = app;