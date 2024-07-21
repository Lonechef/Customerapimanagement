const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

const rateLimit = require('../middleware/rateLimit')

router.get('/',rateLimit, async (req, res) => {
    const startTime = process.hrtime();

    try {
        const customers = await Customer.find();
        const currentYear = new Date().getFullYear();

        const eligibleCustomers = customers.filter(customer => {
            const birthYear = new Date(customer.dob).getFullYear();
            const age = currentYear - birthYear;
            return age >= 10 && age <= 25;
        });

        const customerNames = eligibleCustomers.map(customer => customer.customer_name);

        const endTime = process.hrtime(startTime);
        const timeTaken = (endTime[0] * 1e9 + endTime[1]) / 1e9; 

        res.json({
            customer_names: customerNames,
            time_taken: timeTaken.toFixed(3) 
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error fetching customer data' });
    }
});

module.exports = router;
