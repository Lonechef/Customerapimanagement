const express = require('express');
const router = express.Router();
const Customer = require('../models/customer')
const moment = require('moment');
const rateLimit = require('../middleware/rateLimit')

router.post('/',rateLimit,async(req,res)=>{
    //Taking up from url
    const{customer_name,dob,monthly_income}=req.body;
    const now = moment();

    if(now.day()==1){
        return res.status(400).json({message:"PLease don't use API on Monday"});
    }
    if(now.hour()>=8 && now.hour()<15){
        return res.status(400).json({message:"Please try after 3pm"})
    }
    try{
        //If not that the case we will be creating new Customer
        const newCustomer = new Customer({customer_name,dob,monthly_income});
        await newCustomer.save();
        res.json({message:'Customer Saved SUccessfully'})
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:'Error Saving Customer'})
    }
})
module.exports=router;