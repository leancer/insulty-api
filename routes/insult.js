const express = require("express");
const router = express.Router();
const Insult = require("../models/insult");
const { body, validationResult } = require("express-validator");


router.get("/",async (req,res) => {
    
    try{
        const insults = await Insult.find();
        if(insults.length > 0){
            res.json({status:"success",data:insults});
        }else{
            res.json({status:"error",err:"no Insult Found"})
        }
        
    }catch(err){
        res.json({status:"error",err:err});
    }
    
})

router.post("/add",[
    body("insult").isString().not().isEmpty(),
    body("lang").exists()
], async (req,res) => {
    const errors = validationResult(req); 
    
    if(!errors.isEmpty()){
        return res.status(400).json({status:"error",errors:errors.array()});
    }
    const body = req.body;

    try{

        const insult = new Insult(body);

        await insult.save();

        res.json({status:"success",data:insult});

    }catch(err){
        res.status(500).json({status:"error",errors:err});
    }
})

module.exports = router;