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
    query = {'userId': req.body.userId};
    //takes a user id and based on that 
    //either createsd object with attribute or updates attributes based on new request body
    User.findOneAndUpdate(query, req.body, {upsert: true}, function(err, doc) {
        if (err) return res.send(500, {error: err});
        return res.send("hello " +req.body.userId);
    });

    console.log(req.body);


});

module.exports = router;