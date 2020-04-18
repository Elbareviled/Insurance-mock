const router = require('express').Router();
let User = require('../models/userinfo.models');



router.route("/:uid").get((req, res) =>{

    User.findById(req.params.uid)
        .then(user => res.json(user))
        .catch(err => res.status(400).json("ERROR " + err));

});

router.route('/add').post((req,res) => {
    const userId = req.body.userId;
    const age = req.body.age;
    const sex = req.body.sex;
    const income = req.body.income;
    const numFamilyMembers = req.body.numFamilyMembers;
    const numChildren = req.body.numChildren;
    const preexistingConditions = req.body.preexistingConditions;

    const newUser = new User({
        userId,
        age,
        sex,
        income,
        numFamilyMembers,
        numChildren,
        preexistingConditions,
    });

    newUser.save()
    .then(() => res.json('User Added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/').get((req, res) =>{
    User.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).json("ERROR " + err  ));
});

router.route("/:uid").post((req, res) =>{
    var query = {'_id': req.params.uid};
    //takes a user id and based on that    
    //either createsd object with attribute or updates attributes based on new request body
    let attributes = ['age','sex','income','numFamilyMembers','preexistingConditions']
    let toUpdate = {
        [attributes[req.body.current]]: req.body.value
    }
    User.findOneAndUpdate(query, toUpdate, {upsert: true}, function(err, doc) {
        if (err) return res.send(500, {error: err});
        return res.send("hello " +req.body.userId);
    });

    console.log(req.body);


});

function calculate(id,s,i,a,fam,prec){
    let points = 0;
    let preCons = [{precondition: "Asthma" , val : 1}, 
        {precondition: "High Colesterol", val: 2},
        {precondition: "High Blood Pressure", val: 2},
        {precondition: "Arthritis", val:4},
        {precondition: "Diabetes", val: 4},
        {precondition: "Cancer", val: 4},
        {precondition: "Emphysema", val: 5},
        {precondition: "Heart Disease", val: 5},
        {precondition: "Stroke", val: 5}];
    
    var recommend = {p: 0, reasoning: [], recommendationLong: []}
    
    if (s === '0') {
        points += 1
        recommend.reasoning.push("On average females have higher usage rates of healthcare");
    };

    if (a<=19){
        recommend.reasoning.push("Health care costs for American's under 19 are typically lower than average");
    }else if (a < 35){
        points += 1;
        recommend.reasoning.push("Health care costs for American's above the age of 19 are slightly higher than average");
    }else if (a < 44){
        recommend.reasoning.push("Health care costs for American's over the age of 35 higher than average");
        recommend.recommendationLong.push("An analysis by the Kaiser Family Foundation of a Medical Expenditure Panel Survey shows that individuals between the ages of 35 and 44 spend $4,262 dollars compared to $2,153 spent by individuals under the age of 19");
        points += 2;
    }else if (a < 54){
        points += 3;
        recommend.reasoning.push("Health care costs for American's over the age of 44 higher than average");
    }else{
        points +=4;
        recommend.reasoning.push("Health care costs for American's over the age of 54 significantly higher than average");
    }

    if (prec.length === 0){
        points += 0;
    }else if (prec.length > 1){
        recommend.reasoning.push("Individuals with more than one pre-existing condition have, on average, significantly higher healthcare costs");
        recommend.recommendationLong.push("Analysis of Medical Expenditure Panel Surveys show that individuals with multiple diagnised chronic health conditions have high medical costs. Conditions such as Heart Disease, Stroke, and Emphysema each raised the cost of healthcare from around $5,500 dollars to $16,000")
        points += 5;
    }else if(prec.includes("Asthma")){
        recommend.reasoning.push("Individuals diagnosed with Asthma have on average 1.5 times higher medical costs");
        points +=1;
    }else if(prec.includes("High Colesterol") || prec.includes("High Blood Pressure")){
        recommend.reasoning.push("Individuals diagnosed with High Colesterol or High Pressure have on average 2.3 times higher medical costs than undiagnosed individuals");
        points += 2;
    }
    else if(prec.includes("Arthritis") || prec.includes("Diabetes") || prec.includes("Cancer")){
        recommend.reasoning.push("Individuals diagnosed with Arthritis, Diabetes, or Cancer have roughly 3 times higher medical costs than undiagnosed individuals");
        points += 4;
    }else if(prec.includes("Emphysema") || prec.includes("Heart Disease") || prec.includes("Stroke")){
        recommend.reasoning.push("Individuals diagnosed with Emphysema, Heart Disease, or Stroke have roughly 3 times higher medical costs than undiagnosed individuals");
        points += 5;
    };
    
    if (fam <2){
    }else if(fam === 2){
        points += 3;
    }else if(fam === 3){
        points +=4;
    }else if(fam > 4){
        points +=5;
    }
    recommend.p = points;
    return recommend; 
}

router.route('/:uid').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/calculate/:uid').post((req, res) =>{
    
    User.findById(req.params.uid).exec(function(err,result){
        if(!err){
            var points;
            var userId = result.userId;
            var sex = result.sex;
            var income = result.income;
            var age = result.age;
            var numFamilyMembers = result.numFamilyMembers;
            var preexistingconditions = result.preexistingConditions;
            
            console.log(result);
            var calcs = calculate(userId,sex,income,age,numFamilyMembers,preexistingconditions);
            console.log(calcs);
            points = calcs.p;
            var reasoning = calcs.reasoning;
            var recLong = calcs.recommendationLong;

            if (points > 4 || age < 55){
                var rec = "HDHP Plan";
            }else{
                var rec = "PPO Plan";
            }
            if (income < 70000){
                rec += " Premier";
            }else{
                rec += " Standard";
            }
            
            

            res.send({
                userId: userId,
                sex: sex,
                income: income,
                age: age,
                numFamilyMembers: numFamilyMembers,
                preexistingcondition: preexistingconditions,
                recommendation: rec,
                recommendation_reasoning: reasoning,
                recommendationLong: recLong,
                placeholder_dollar_amount: 4500,
                points: points
            })
        }else{
            res.send(500,{error:err});
        }
    })
});

module.exports = router;