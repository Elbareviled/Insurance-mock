const router = require('express').Router();
let Plan = require('../models/insuranceplan.models');


router.route('/').get((req, res) =>{
    Plan.find()
        .then(plans => res.json(plans))
        .catch(err => res.status(400).json("ERROR"));
});

router.route('/:id').get((req, res) => {
    Plan.findById(req.params.id)
        .then(plans => res.json(plans))
        .catch(err => res.status(400).json("ERROR"));
});

router.route('/:id').delete((req, res) =>{
    Plan.findByIdAndRemove(req.params.id)
    .then(user=> res.json(user))
    .catch(err => res.status(400).json("ERROR " + err));
});


router.route('/add').post((req, res) => {
    console.log(req);
    console.log(res);
    const newPlan = new Plan({
        planName: req.body.planName,
        premium: req.body.premium,
        coveredBeforeDeductible: req.body.coveredBeforeDeductible,
        needRefferal: req.body.needRefferal,
        planGrade: req.body.planGrade,
        deductibleInNetworkIndividual: req.body.deductibleInNetworkIndividual,
        deductibleOutOfNetworkIndividual: req.body.deductibleOutOfNetworkIndividual,
        deductibleInNetworkFamily: req.body.deductibleInNetworkFamily,
        deductibleOutOfNetworkFamily: req.body.deductibleOutOfNetworkFamily,
        outOfPocketIndividualInNetwork: req.body.outOfPocketIndividualInNetwork,
        outOfPocketIndividualOutOfNetwork: req.body.outOfPocketIndividualOutOfNetwork,
        outOfPocketFamilyInNetwork: req.body.outOfPocketFamilyInNetwork,
        outOfPocketFamilyOutOfNetwork: req.body.outOfPocketFamilyOutOfNetwork,
        canKeepDoctor: req.body.canKeepDoctor,
        inNetworkCopay: req.body.inNetworkCopay, //Avg in provider office visit cost
        inNetworkDrugCopayAvg: req.body.inNetworkDrugCopayAvg, //Avg in network drug copay cost
        outOfNetworkCopay: req.body.outOfNetworkCopay, //Coinsurance cost %
        outOfNetworkDrugCopay: req.body.outOfNetworkDrugCopay, //Coinsurance cost %
        erVisitInNetwork: req.body.erVisitInNetwork, //ER Visit in Network
        erVisitOutOfNetwork: req.body.erVisitOutOfNetwork, // ER Visit Out of Network
        erTransportInNetwork: req.body.erTransportInNetwork,
        erTransportOutOfNetwork: req.body.erTransportOutOfNetwork,
        inNetworkUrgentCare: req.body.inNetworkUrgentCare,
        outOfNetworkUrgentCare: req.body.outOfNetworkUrgentCare,
        inNetworkRehabilitation: req.body.inNetworkRehabilitation, //Coinsurance cost % for rehab services
        outOfNetworkRehabilitation: req.body.outOfNetworkRehabilitation, //Coinsurance cost % for out of network services
    });

    newPlan.save()
    .then(() => res.json("plan added"))
    .catch(err => res.status(400).json("ERROR")); 
});




module.exports = router;
