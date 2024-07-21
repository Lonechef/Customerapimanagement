  const mongoose = require("mongoose");

  const customerSchema = new mongoose.Schema({
    customer_name: { type: String, required: true },
    dob: { type: Date, required: true },
    monthly_income: { type: Number, required: true }
  });

  customerSchema.pre('save', function(next) {
    const today = new Date();
    const birthDate = new Date(this.dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 16) {
      return next(new Error('Age must be above 15'));
    }
    next();
  });

  module.exports = mongoose.model('Customer', customerSchema);
