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
// router.route('/').post((req, res) => {
//     console.log(req);
//     console.log(res);
//     const premium = req.body.premium;
//     const deductible = req.body.deductible;
//     const outOfPocket = req.body.outOfPocket;
//     const canKeepDoctor = req.body.canKeepDoctor;
//     const planType = req.body.planType;
//     const newPlan = new Plan({
//         premium,
//         deductible,
//         outOfPocket,
//         canKeepDoctor,
//         planType
//     });

//     newPlan.save()
//     .then(() => res.json("plan added"))
//     .catch(err => res.status(400).json("ERROR")); 
// });
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
        canKeepDoctor: req.body.canKeepDoctor
    });

    newPlan.save()
    .then(() => res.json("plan added"))
    .catch(err => res.status(400).json("ERROR")); 
});




module.exports = router;
