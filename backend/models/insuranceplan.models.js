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
	canKeeptDoctor: Boolean,
	inNetworkCopay: Number, //Avg in provider office visit cost
	inNetworkDrugCopayAvg: String, //Avg in network drug copay cost
	outOfNetworkCopay: String, //Coinsurance cost %
	outOfNetworkDrugCopay: String, //Coinsurance cost %
	erVisitInNetwork: String, //ER Visit in Network
	erVisitOutOfNetwork: String, // ER Visit Out of Network
	erTransportInNetwork: String,
	erTransportOutOfNetworK: String,
	inNetworkUrgentCare: String,
	outOfNetworkUrgentCare: String,
	inNetworkRehabilitation: String, //Coinsurance cost % for rehab services
	outOfNetworkRehabilitation: String, //Coinsurance cost % for out of network services

},{
	timestamps: true,
});
const Plan = mongoose.model('Plan', insurancePlanSchema);

module.exports = Plan;
