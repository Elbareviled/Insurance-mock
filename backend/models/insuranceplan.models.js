const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// const insurancePlanSchema = new Schema({
// 	premium: Number,
// 	deductible: Number,
// 	outOfPocket: Number,
// 	canKeepDoctor: Boolean,
// 	planType: String
// },{
// 	timestamps: true,
// });

// const insurancePlanSchema = new Schema({
// 	planType: String, //PPO, HDHP
// 	planTier: String, //Standard, Premium
// 	premium: Number,
// 	coveredBeforeDeductible: [String],
// 	needRefferal: Boolean,
// 	planGrade: String,
// 	deductible: {
// 		inNetwork: Number,
// 		outOfNetwork: Number
// 	},
// 	outOfPocket: {
// 		individual:{
// 			inNetwork: Number,
// 			outOfNetwork: Number
// 		},
// 		family: {
// 			inNetwork: Number,
// 			outOfNetwork: Number
// 		}
// 	},
// 	canKeeptDoctor: Boolean
// },{
// 	timestamps: true,
// });


const insurancePlanSchema = new Schema({
	planName: String, //PPO, HDHP
	premium: Number,
	coveredBeforeDeductible: [String],
	needRefferal: Boolean,
	planGrade: String,
	deductibleInNetworkIndividual: Number,
	deductibleOutOfNetworkIndividual: Number,
	deductibleInNetworkFamily: Number,
	deductibleOutOfNetworkFamily: Number,
	outOfPocketIndividualInNetwork: Number,
	outOfPocketIndividualOutOfNetwork: Number,
	outOfPocketFamilyInNetwork: Number,
	outOfPocketFamilyOutOfNetwork: Number,
	canKeeptDoctor: Boolean
},{
	timestamps: true,
});
const Plan = mongoose.model('Plan', insurancePlanSchema);

module.exports = Plan;
