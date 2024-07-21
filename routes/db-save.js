const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');
const rateLimit = require('../middleware/rateLimit');

router.post('/',rateLimit,async(req,res)=>{
    const{customer_name,dob,monthly_income}=req.body;

    try{
        if(!customer_name || !dob || !monthly_income){
            return res.status(400).json({message:'All files are required'})
        }

        const newCustomer = new Customer({customer_name,dob,monthly_income})
        await newCustomer.save();

        res.json({message:'Customer Saved Successfully'});

    }catch(err){
        
        console.log(err);
        res.status(500).json({message:'Error saving customer'})
    }
})

module.exports=router;