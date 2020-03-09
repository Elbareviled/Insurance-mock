const router = require('express').Router();
let User = require('../models/userinfo.models');



router.route("/:uid").get((req, res) =>{

    User.findById(req.params.uid)
        .then(user => res.json(user))
        .catch(err => res.status(400).json("ERROR"));

});

router.route('/').get((req, res) =>{
    User.find()
        .then(plans => res.json(plans))
        .catch(err => res.status(400).json("ERROR"));
});

router.route("/:uid").post((req, res) =>{
    var query = {'userId': req.body.userId};
    //takes a user id and based on that 
    //either createsd object with attribute or updates attributes based on new request body
    User.findOneAndUpdate(query, req.body, {upsert: true}, function(err, doc) {
        if (err) return res.send(500, {error: err});
        return res.send("hello " +req.body.userId);
    });

    console.log(req.body);


});

function calculate(id,s,i,a,fam,prec){
    let points = 0;
    let preexistinConditions = [{precondition: "Asthma" , val : 1}, 
        {precondition: "High Colesterol", val: 2},
        {precondition: "High Blood Pressure", val: 2},
        {precondition: "Arthritis", val:4},
        {precondition: "Diabetes", val: 4},
        {precondition: "Cancer", val: 4},
        {precondition: "Emphysema", val: 5},
        {precondition: "Heart Disease", val: 5},
        {precondition: "Stroke", val: 5}];
    
    var recommend = {p: 0, reasoning: []}
    
    if (s === 'f') {
        points += 1
        recommend.reasoning.push("On average females have higher usage rates of healthcare");
    };

    if (a<=19){
        recommend.reasoning.push("Health care costs for American's under 19 are typically lower than average");
    }else if (a < 35){
        points += 1;
        recommend.reasoning.push("Health care costs for American's under above the age of 19 are slightly higher than average");
    }else if (a < 44){
        recommend.reasoning.push("Health care costs for American's under above over the age of 35 higher than average");
        points += 2;
    }else if (a < 54){
        points += 3;
        recommend.reasoning.push("Health care costs for American's under above over the age of 44 higher than average");
    }else{
        points +=4;
        recommend.reasoning.push("Health care costs for American's under above over the age of 54 significantly higher than average");
    }

    if (prec.length === 0){
        points += 0;
    }else if (prec.length > 1){
        recommend.reasoning.push("Individuals with more than one pre-existing condition have, on average, significantly higher healthcare costs");
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
            
            var calcs = calculate(userId,sex,income,age,numFamilyMembers,preexistingconditions);
            points = calcs.p;
            var reasoning = calcs.reasoning;
            if (points > 4 || age < 55){
                var rec = "HDHP Plan";
            }else{
                var rec = "PPO Plan";
            }
            if (income < 70000){
                rec += " Premier";
            }else{
                rec += "Standard";
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
                placeholder_dollar_amount: 4500,
                points: points
            })
        }else{
            res.send(500,{error:err});
        }
    })
});

module.exports = router;