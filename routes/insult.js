const express = require("express");
const router = express.Router();
const Insult = require("../models/insult");
const { body, validationResult } = require("express-validator");


router.get("/",async (req,res) => {
    
    try{
        const insult = await Insult.random('hindi');
        if(insult){
            res.json({status:"success",data:insult});
        }else{
            res.json({status:"error",err:"no Insult Found"})
        }
        
    }catch(err){
        res.json({status:"error",err:err});
    }
    
})

router.get("/:lang",async (req,res) => {
    
    let { lang } = req.params;
    try{
        const insult = await Insult.random(lang);
        if(insult){
            res.json({status:"success",data:insult});
        }else{
            res.json({status:"error",err:"no Insult Found"})
        }
        
    }catch(err){
        res.json({status:"error",err:err});
    }
    
})

router.post("/add", async (req,res) => {
    const body = req.body;
    try{
        let insult;
        if(Array.isArray(body)){

            insult = await Insult.insertMany(body);
        }else{
             insult = new Insult(body);
            await insult.save();
        }

        res.json({status:"success",data:insult});

    }catch(err){
        res.status(500).json({status:"error",errors:err});
    }
})

module.exports = router;