const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const insurancePlanSchema = new Schema({
	premium: Number,
	deductible: Number,
	outOfPocket: Number,
	canKeepDoctor: Boolean,
	planType: String
},{
	timestamps: true,
});

const Plan = mongoose.model('Plan', insurancePlanSchema);

module.exports = Plan;
